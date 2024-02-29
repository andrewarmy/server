import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(4, { message: 'Name should be at least 4 charactes' })
    @MaxLength(25, { message: 'Name cannot exceed 20 characters' })
    name: string;

    @IsNotEmpty({ message: 'Username cannot be empty' })
    @IsString({ message: 'Username must be a string' })
    username: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @IsString({ message: 'Password should be a string' })
    @MinLength(8, { message: 'Password should be at least 8 charactes' })
    password: string;

    @IsNotEmpty({ message: 'You are not allowed' })
    @IsString({ message: 'You are not allowed' })
    key: string;
}