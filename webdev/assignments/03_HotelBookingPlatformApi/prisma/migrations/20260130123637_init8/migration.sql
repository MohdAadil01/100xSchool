/*
  Warnings:

  - The `amenities` column on the `Hotel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `rating` on the `Hotel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(2,1)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "amenities",
ADD COLUMN     "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
