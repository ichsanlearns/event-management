import { type Request, type Response } from "express";

import { create, getByEmail, getByReferral } from "../services/auth.service.js";
import { Role } from "../generated/prisma/enums.js";
import { generateReferralCode } from "../utils/referral.util.js";

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;
  let bool = true;
  let referralCode = "referral";

  if (!name) {
    return res.status(404).json({ message: "Tolong isi nama anda!" });
  }

  if (!email) {
    return res.status(404).json({ message: "Tolong isi email anda!" });
  }

  if (!password) {
    return res.status(404).json({ message: "Tolong isi password anda!" });
  }

  if (!role || !Object.values(Role).includes(role)) {
    return res
      .status(404)
      .json({ message: "Tolong isi role anda yang benar!" });
  }

  const userExist = await getByEmail(email, password);

  if (userExist) {
    return res.status(400).json({ message: "Email sudah terdaftar!" });
  }

  while (true) {
    referralCode = generateReferralCode();
    const existReferral = await getByReferral(referralCode);

    if (!existReferral) {
      break;
    }
  }

  const userData = await create(name, email, password, role, referralCode);

  res.status(201).json({ message: "User created", "new user": userData });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(404).json({ message: "Tolong isi email anda!" });
  }

  if (!password) {
    return res.status(404).json({ message: "Tolong isi password anda!" });
  }

  const user = await getByEmail(email, password);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Gagal login, check kembali email dan password anda!" });
  }

  user?.password === password
    ? res.status(200).json({ message: "Selamat, anda berhasil login!" })
    : res.status(404).json({
        message: "Gagal login, check kembali email dan password anda!",
      });
}
