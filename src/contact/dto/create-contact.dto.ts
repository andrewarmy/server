import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export enum Religion {
    christian = 'مسيحى',
    muslim = 'مسلم',
}

export enum MaterialStatus {
    single = 'اعذب',
    married = 'متزوج',
    broken = 'مطلق',
    widow = 'أرمل'
}

export enum Gender {
    male = 'ذكر',
    female = 'انثى',
}

export class CreateContactDto {
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    national_number?: string

    @IsNotEmpty()
    @IsString()
    birth_date: Date

    // 0 1554867586
    @MinLength(11)
    @IsNotEmpty()
    @IsString()
    telephone_number: string

    @MinLength(11)
    @IsOptional()
    @IsString()
    phone_number_work?: string

    @IsOptional()
    @MinLength(11)
    @IsString()
    phone_number_home?: string;

    @MinLength(4)
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsEnum(Religion)
    religion: Religion

    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender
}