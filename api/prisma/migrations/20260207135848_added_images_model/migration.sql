-- CreateTable
CREATE TABLE "ImagesEvent" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,

    CONSTRAINT "ImagesEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagesEvent" ADD CONSTRAINT "ImagesEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesEvent" ADD CONSTRAINT "ImagesEvent_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
