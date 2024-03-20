/*
  Warnings:

  - Added the required column `certificate` to the `Civilian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificate` to the `Individual` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Individual` table without a default value. This is not possible if the table is not empty.
  - Added the required column `certificate` to the `Police` table without a default value. This is not possible if the table is not empty.
  - Added the required column `police_type` to the `Police` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Civilian" ADD COLUMN     "certificate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Individual" ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "police_type" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL;
