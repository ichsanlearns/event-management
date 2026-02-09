/*
  Warnings:

  - You are about to drop the column `reset_token_expired` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "reset_token_expired",
ADD COLUMN     "reset_token_expiry" TIMESTAMP(3);
