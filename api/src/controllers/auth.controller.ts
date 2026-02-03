import { type Request, type Response } from "express";
import { Role } from "../generated/prisma/enums.js";
import { createUser, findByEmail, findByReferral } from "../services/auth.service.js";
import { generateReferralCode } from "../utils/referral.util.js";
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { prisma } from "../lib/prisma.lib.js";
import { access } from "node:fs";

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

  let referralCode: string;
  do {
    referralCode = generateReferralCode();
  } while (await findByReferral(referralCode));

  const hashedPassword = await hashPassword(password);

  const user = await createUser(name, email, hashedPassword, role, referralCode, referred_by);

  res.status(201).json({
    message: "User berhasil dibuat",
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      referral_code: user.referral_code,
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
    },
  });

  res.json(user);
}
