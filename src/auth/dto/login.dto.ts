import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Username cannot be empty' })
    @IsString({ message: 'Username must be a string' })
    username: string;
  
    @IsNotEmpty({ message: 'Password is not valid' })
    @IsString({ message: 'Password is not valid' })
    @MinLength(8, { message: 'Password is not valid' })
    password: string;
}