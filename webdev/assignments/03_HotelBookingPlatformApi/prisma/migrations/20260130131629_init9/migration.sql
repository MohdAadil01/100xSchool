-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomNumber" SET DATA TYPE TEXT;
