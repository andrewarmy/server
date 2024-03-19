import { IsString, MaxLength, MinLength } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export class CreateCivilianDto extends CreateContactDto {
    @MaxLength(14)
    @MinLength(14)
    @IsString()
    national_number: string
}

