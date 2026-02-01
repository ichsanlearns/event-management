/*
  Warnings:

  - Changed the type of `using_point` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "using_point",
ADD COLUMN     "using_point" INTEGER NOT NULL;
