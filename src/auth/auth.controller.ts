import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials)
    }

    @Get('profile')
    getProfile(@Request() req) {
        console.log('aa')
        return req.user;
    }
}
