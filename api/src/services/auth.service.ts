import { prisma } from "../lib/prisma.lib.js";

import { Role } from "../generated/prisma/enums.js";

export async function create(
  name: string,
  email: string,
  password: string,
  role: Role,
  referralCode: string,
) {
  return await prisma.user.create({
    data: { name, email, password, role, referral_code: referralCode },
  });
}

export async function getByEmail(email: string, password: string) {
  return await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });
}

export async function getByReferral(referralCode: string) {
  return await prisma.user.findUnique({
    where: { referral_code: referralCode },
  });
}
