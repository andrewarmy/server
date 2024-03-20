import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateGroupDto  {
    @MinLength(4)
    @IsString()
    name: string
}

