import { prisma } from "../lib/prisma.lib.js";
import { Role } from "../generated/prisma/enums.js";

export async function createUser(name: string, email: string, hashedPassword: string, role: Role, referralCode: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      referral_code: referralCode,
    },
  });
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findByReferral(referralCode: string) {
  return prisma.user.findUnique({
    where: { referral_code: referralCode },
  });
}
