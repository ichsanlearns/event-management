/*
  Warnings:

  - You are about to drop the column `Quota` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `quota` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "Quota",
ADD COLUMN     "quota" INTEGER NOT NULL;
