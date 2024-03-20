import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export enum IndividualPosition {
    amen = 'امين شرطة',
    rkeb = 'رقيب',
    m3awen = 'معاون',
    shorty = 'شرطى',
    msa3ed = 'مساعد'
}

export class CreateIndividualDto extends CreateContactDto {
    @MaxLength(14)
    @MinLength(14)
    @IsString()
    national_number: string

    @IsEnum(IndividualPosition)
    position: IndividualPosition
}

