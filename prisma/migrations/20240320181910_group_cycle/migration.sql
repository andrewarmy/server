-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cycle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicesInCycles" (
    "police_id" INTEGER NOT NULL,
    "cycle_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PolicesInCycles_pkey" PRIMARY KEY ("police_id","cycle_id")
);

-- CreateTable
CREATE TABLE "CiviliansInCycles" (
    "civilian_id" INTEGER NOT NULL,
    "cycle_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CiviliansInCycles_pkey" PRIMARY KEY ("civilian_id","cycle_id")
);

-- CreateTable
CREATE TABLE "IndividualsInCycle" (
    "individual_id" INTEGER NOT NULL,
    "cycle_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IndividualsInCycle_pkey" PRIMARY KEY ("individual_id","cycle_id")
);

-- AddForeignKey
ALTER TABLE "Cycle" ADD CONSTRAINT "Cycle_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicesInCycles" ADD CONSTRAINT "PolicesInCycles_police_id_fkey" FOREIGN KEY ("police_id") REFERENCES "Police"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicesInCycles" ADD CONSTRAINT "PolicesInCycles_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CiviliansInCycles" ADD CONSTRAINT "CiviliansInCycles_civilian_id_fkey" FOREIGN KEY ("civilian_id") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CiviliansInCycles" ADD CONSTRAINT "CiviliansInCycles_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualsInCycle" ADD CONSTRAINT "IndividualsInCycle_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "Individual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualsInCycle" ADD CONSTRAINT "IndividualsInCycle_cycle_id_fkey" FOREIGN KEY ("cycle_id") REFERENCES "Cycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
