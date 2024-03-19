import { Contains, IsOptional, IsString } from "class-validator";
import { CreateContactDto } from "src/contact/dto/create-contact.dto";

export class CreatePoliceDto extends CreateContactDto {
    @IsOptional()
    @IsString()
    national_number?: string

    @Contains('/', { message: 'police number is invalid' })
    @IsString()
    police_number: string
}

