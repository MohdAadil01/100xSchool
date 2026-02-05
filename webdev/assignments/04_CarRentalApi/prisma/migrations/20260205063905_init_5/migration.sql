/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookingDate]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'booked';

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_bookingDate_key" ON "Booking"("userId", "bookingDate");
