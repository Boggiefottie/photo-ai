/*
  Warnings:

  - The values [AsianAmerican,SouthAsian,MiddleEastern,SouthEastAsian] on the enum `EthnicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthnicityEnum_new" AS ENUM ('Asian American', 'Black', 'White', 'Hispanic', 'South Asian', 'East Asian', 'Middle Eastern', 'South East Asian', 'Pacific');
ALTER TABLE "Model" ALTER COLUMN "ethnicity" TYPE "EthnicityEnum_new" USING ("ethnicity"::text::"EthnicityEnum_new");
ALTER TYPE "EthnicityEnum" RENAME TO "EthnicityEnum_old";
ALTER TYPE "EthnicityEnum_new" RENAME TO "EthnicityEnum";
DROP TYPE "EthnicityEnum_old";
COMMIT;
