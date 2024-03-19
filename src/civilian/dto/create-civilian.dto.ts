import { IsString, MinLength } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export class CreateCivilianDto extends CreateContactDto {
    @MinLength(4)
    @IsString()
    national_number: string
}

