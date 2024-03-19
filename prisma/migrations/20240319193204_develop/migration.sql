-- CreateTable
CREATE TABLE "Civilian" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "national_number" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "telephone_number" TEXT NOT NULL,
    "phone_number_work" TEXT,
    "phone_number_home" TEXT,
    "address" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "work_direction_id" INTEGER NOT NULL,
    "work_at" TEXT,

    CONSTRAINT "Civilian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Individual" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "national_number" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "telephone_number" TEXT NOT NULL,
    "phone_number_work" TEXT,
    "phone_number_home" TEXT,
    "address" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "work_direction_id" INTEGER NOT NULL,
    "work_at" TEXT,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Civilian_national_number_key" ON "Civilian"("national_number");

-- CreateIndex
CREATE UNIQUE INDEX "Individual_national_number_key" ON "Individual"("national_number");

-- AddForeignKey
ALTER TABLE "Civilian" ADD CONSTRAINT "Civilian_work_direction_id_fkey" FOREIGN KEY ("work_direction_id") REFERENCES "WorkDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Individual" ADD CONSTRAINT "Individual_work_direction_id_fkey" FOREIGN KEY ("work_direction_id") REFERENCES "WorkDirection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
