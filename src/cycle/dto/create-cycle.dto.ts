import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateCycleDto  {
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

