/*
  Warnings:

  - The values [Completed] on the enum `OutputStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ModelTrainingStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterEnum
BEGIN;
CREATE TYPE "OutputStatusEnum_new" AS ENUM ('Pending', 'Generated', 'Failed');
ALTER TABLE "OutputImages" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "OutputImages" ALTER COLUMN "status" TYPE "OutputStatusEnum_new" USING ("status"::text::"OutputStatusEnum_new");
ALTER TYPE "OutputStatusEnum" RENAME TO "OutputStatusEnum_old";
ALTER TYPE "OutputStatusEnum_new" RENAME TO "OutputStatusEnum";
DROP TYPE "OutputStatusEnum_old";
ALTER TABLE "OutputImages" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "faiAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "ModelTrainingStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiRequestId" TEXT,
ALTER COLUMN "imageUrl" SET DEFAULT '';
