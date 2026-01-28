/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name,city]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "amenities" SET DEFAULT '[]';

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_ownerId_name_city_key" ON "Hotel"("ownerId", "name", "city");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
