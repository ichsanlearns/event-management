-- AlterTable
ALTER TABLE "events" ADD COLUMN     "about" TEXT,
ADD COLUMN     "venue" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "expired_at" TIMESTAMP(3);
