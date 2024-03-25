import { Contains, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export enum PoliceType {
    public = 'عام',
    private = 'خاص',
}

export enum PolicePosition {
    mlazem = 'ملازم',
    mlazemA = 'ملازم.أ',
    nkeb = 'نقيب',
    raed = 'رائد',
    mokdm = 'مقدم',
    aked = 'عقيد',
    amed = 'عميد',
    lwa = 'لواء'
}


export class CreatePoliceDto extends CreateContactDto {
    @IsOptional()
    @MaxLength(14)
    @MinLength(14)
    @IsString()
    national_number?: string

    @IsNotEmpty()
    @IsEnum(PoliceType)
    police_type: PoliceType

    @IsNotEmpty()
    @IsEnum(PolicePosition)
    position: PolicePosition

    @Contains('/', { message: 'police number is invalid' })
    @IsString()
    police_number: string
}

