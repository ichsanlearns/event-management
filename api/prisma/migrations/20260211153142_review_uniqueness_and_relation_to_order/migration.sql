/*
  Warnings:

  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "order_id" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_event_id_key" ON "reviews"("user_id", "event_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
