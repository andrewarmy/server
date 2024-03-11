/*
  Warnings:

  - Added the required column `work_direction_id` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "work_direction_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WorkDirection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkDirection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Police" ADD CONSTRAINT "Police_work_direction_id_fkey" FOREIGN KEY ("work_direction_id") REFERENCES "WorkDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
