import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials)
    }

    @Public()
    @Post('register')
    register(@Body() data: RegisterDto) {
        return this.authService.register(data)
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
