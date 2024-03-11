import { IsString } from "class-validator";

export class CreateWorkDirectionDto {
    @IsString()
    name: string
}

