import { Contains, IsString, MinLength } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export class CreateIndividualDto extends CreateContactDto {
    @MinLength(5)
    @IsString()
    national_number: string
}

