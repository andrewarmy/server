import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { CreateCivilianDto } from "src/civilian/dto/create-civilian.dto";
import { CreateIndividualDto } from "src/individual/dto/create-individual.dto";
import { CreatePoliceDto } from "src/police/dto/create-police.dto";

type AddIdProp<T> = T & {id: number} 

export class CycleContactDto {
    @IsArray()
    PolicesInCycles: AddIdProp<CreatePoliceDto>[]

    @IsArray()
    CiviliansInCycles: AddIdProp<CreateCivilianDto>[]

    @IsArray()
    IndividualsInCycle: AddIdProp<CreateIndividualDto>[]
}

export class CreateCycleDto extends CycleContactDto {
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
}

