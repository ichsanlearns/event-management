import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma.lib.js";
import { comparePassword, hashPassword } from "../utils/hash.util.js";
import { uploadToCloudinary } from "../services/image.service.js";
import { catchAsync } from "../utils/catch-async.util.js";
import { getById } from "../services/user.service.js";

export const getUserPointAndCoupon = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const points = await prisma.point.findMany({
      where: {
        user_id: userId,
        expired_at: {
          gt: new Date(),
        },
      },
      orderBy: { expired_at: "asc" },
    });

    const coupons = await prisma.coupon.findMany({
      where: {
        user_id: userId,
        expired_at: {
          gt: new Date(),
        },
      },
      orderBy: { expired_at: "asc" },
    });

    return res.json({
      total_point: points.reduce((sum, p) => sum + p.amount, 0),
      points,
      coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get rewards",
    });
  }
};

export async function getMe(req: Request, res: Response) {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      referral_code: true,
      Points: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  res.json(user);
}

export async function uploadProfileImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const userId = req.user!.id;

    const imageUrl = await uploadToCloudinary(req.file.buffer, "profile");

    await prisma.user.update({
      where: { id: userId },
      data: { profile_image: imageUrl },
    });

    res.json({
      message: "Upload berhasil",
      profile_image: imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload gagal" });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const { name, email, oldPassword, newPassword, confirmPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const dataToUpdate: any = {
      name,
      email,
    };

    // =====================
    // OPTIONAL CHANGE PASSWORD
    // =====================
    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          message: "Semua field password wajib diisi",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          message: "Konfirmasi password tidak sama",
        });
      }

      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Password lama salah",
        });
      }

      dataToUpdate.password = await hashPassword(newPassword);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        referral_code: true,
      },
    });

    res.json({
      message: "Profile berhasil diperbarui",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function changePassword(req: Request, res: Response) {
  const userId = req.user!.id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Konfirmasi password tidak sama" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }

  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Password lama salah" });
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "Password berhasil diubah" });
}

export const getOrgById = catchAsync(async (req: Request, res: Response) => {
  const orgId = req.params.id as string;

  const org = await getById(orgId);

  res.status(200).json({
    message: "Get org by id success",
    data: org,
  });
});
