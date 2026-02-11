import { type Request, type Response } from "express";
import { Role } from "../generated/prisma/enums.js";
import { createUser, findByEmail, findByReferral } from "../services/auth.service.js";
import { generateReferralCode } from "../utils/referral.util.js";
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { prisma } from "../lib/prisma.lib.js";
import { access } from "node:fs";
import crypto from "crypto";
import { transporter } from "../utils/email.util.js";

export async function register(req: Request, res: Response) {
  const { name, email, password, role, referred_by } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Field tidak lengkap" });
  }

  if (!Object.values(Role).includes(role)) {
    return res.status(400).json({ message: "Role tidak valid" });
  }

  const existingUser = await findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Email sudah terdaftar" });
  }

  // Generate unique referral code
  let referralCode: string;
  do {
    referralCode = generateReferralCode();
  } while (await findByReferral(referralCode));

  const hashedPassword = await hashPassword(password);

  // TRANSACTION BIAR AMAN
  const result = await prisma.$transaction(async (tx) => {
    // Create user
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        referral_code: referralCode,
      },
    });

    // Jika pakai referral
    if (referred_by) {
      const referrer = await tx.user.findUnique({
        where: { referral_code: referred_by },
      });

      if (!referrer) {
        throw new Error("Referral code tidak valid");
      }

      if (referrer.id === newUser.id) {
        throw new Error("Tidak bisa menggunakan referral sendiri");
      }

      if (referrer) {
        const expiredAt = new Date();
        expiredAt.setMonth(expiredAt.getMonth() + 3);

        // POINT UNTUK REFERRER
        await tx.point.create({
          data: {
            user_id: referrer.id,
            amount: 10000,
            expired_at: expiredAt,
          },
        });

        // COUPON UNTUK USER BARU
        await tx.coupon.create({
          data: {
            user_id: newUser.id,
            referrer_id: referrer.id,
            amount: 10000, // contoh diskon
            expired_at: expiredAt,
          },
        });
      }
    }

    return newUser;
  });

  res.status(201).json({
    message: "User berhasil dibuat",
    user: {
      id: result.id,
      email: result.email,
      role: result.role,
      referral_code: result.referral_code,
    },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password wajib" });
  }

  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Email / password salah" });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Email / password salah" });
  }

  const token = generateToken({ id: user.id, role: user.role });

  res.status(200).json({
    message: "Login berhasil",
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      referral_code: user.referral_code,
    },
  });
}

export async function me(req: Request, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      referral_code: true,
      profile_image: true,
    },
  });

  res.json(user);
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "email tidak terdaftar" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      reset_token: token,
      reset_token_expiry: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  const resetLink = `${process.env.WEB_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Event App" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Reset Password",
    html: `
      <h2>Reset Password</h2>
      <p>Klik link di bawah untuk reset password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p><b>Link berlaku 15 menit</b></p>
    `,
  });

  res.json({ message: "Link reset password telah dikirim ke mail" });
}

export async function resetPassword(req: Request, res: Response) {
  const { token, newPassword, confirmPassword } = req.body;

  if (!token || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Field tidak lengkap" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Password tidak sama" });
  }

  const user = await prisma.user.findFirst({
    where: {
      reset_token: token,
      reset_token_expiry: { gt: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Token tidak valid / expired" });
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      reset_token: null,
      reset_token_expiry: null,
    },
  });

  res.json({ message: "Password berhasil direset" });
}
