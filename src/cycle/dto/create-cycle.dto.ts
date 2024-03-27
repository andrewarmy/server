import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { CreatePoliceDto } from "src/police/dto/create-police.dto";

interface PoliceProps extends CreatePoliceDto {
    id: number
}

export class CreateCycleDto {
    @IsNumber()
    group_id: number

    @MinLength(1)
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    start_date: Date;

    @IsNotEmpty()
    @IsString()
    end_date: Date;

    @IsArray()
    PolicesInCycles: PoliceProps[]

    // @IsArray()
    // CiviliansInCycles: CreatePoliceDto[]

    // @IsArray()
    // IndividualsInCycle: CreateCivilianDto[]
}

