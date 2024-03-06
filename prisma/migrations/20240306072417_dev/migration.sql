-- CreateTable
CREATE TABLE "Police" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "national_number" TEXT,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "telephone_number" TEXT NOT NULL,
    "phone_number_work" TEXT,
    "phone_number_home" TEXT,
    "address" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Police_pkey" PRIMARY KEY ("id")
);
