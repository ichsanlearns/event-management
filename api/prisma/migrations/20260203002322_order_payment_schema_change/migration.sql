/*
  Warnings:

  - You are about to drop the column `deadline` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `total_before` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `voucher_id` on the `payments` table. All the data in the column will be lost.
  - Added the required column `amount` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('MANUAL_TRANSFER', 'E_WALLET', 'CREDIT_CARD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'WAITING_CONFIRMATION', 'APPROVED', 'REJECTED', 'FAILED');

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_voucher_id_fkey";

-- DropIndex
DROP INDEX "payments_order_id_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "voucher_id" TEXT;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "deadline",
DROP COLUMN "deleted_at",
DROP COLUMN "quantity",
DROP COLUMN "total",
DROP COLUMN "total_before",
DROP COLUMN "voucher_id",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "confirmed_at" TIMESTAMP(3),
ADD COLUMN     "method" "PaymentMethod" NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "proof_image" TEXT,
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "vouchers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
