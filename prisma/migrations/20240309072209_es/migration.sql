/*
  Warnings:

  - A unique constraint covering the columns `[police_number]` on the table `Police` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `police_number` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "police_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Police_police_number_key" ON "Police"("police_number");
