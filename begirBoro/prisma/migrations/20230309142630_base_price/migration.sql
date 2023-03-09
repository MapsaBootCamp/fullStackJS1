-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "returnDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "basePrice" INTEGER DEFAULT 100;
