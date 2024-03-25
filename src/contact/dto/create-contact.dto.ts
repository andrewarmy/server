import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";


export enum Certificate {
    akok = 'ليسانس حقوق',
    hndsa = 'ب.هندسة',
    alom = 'ب.علوم',
    khdma = 'ب.خدمةاجتماعية',
    zra3a = 'ب.زراعة',
    teb = 'ب.طب',
    tgara_5aregia = 'ب.تجارة خارجية',
    tgara = 'ب.تجارة',
    trbia_riadia = 'ب.تربية رياضية',
    adab = 'ليسانس آداب',
    aktesad_alom_siasia = 'اقتصاد و علوم سياسية'
}

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

    // TODO: in the future we can split this into another table (1-m)
    @IsNotEmpty()
    @IsEnum(Certificate)
    certificate: Certificate

    @IsOptional()
    @IsString()
    work_at?: string;

    @IsNotEmpty()
    @IsNumber()
    work_direction_id: number;
}