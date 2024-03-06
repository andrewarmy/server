/*
  Warnings:

  - A unique constraint covering the columns `[national_number]` on the table `Police` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Police_national_number_key" ON "Police"("national_number");
