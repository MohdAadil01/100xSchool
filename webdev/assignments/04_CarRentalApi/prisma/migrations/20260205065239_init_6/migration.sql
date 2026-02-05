/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookingDate,status]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Booking_userId_bookingDate_key";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_bookingDate_status_key" ON "Booking"("userId", "bookingDate", "status");
