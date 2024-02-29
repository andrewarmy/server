import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { PasswordService } from './password.service';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
        private readonly configService: ConfigService
    ) { }

    async login(credentials: LoginDto) {
        const { username, password } = credentials
        const user = await this.userService.findOne(username)
        if (!user) throw new UnauthorizedException()
        const correctPassword = await this.passwordService.comparePassword(password, user.password)
        if (!correctPassword) throw new UnauthorizedException()
        const token = await this.generateToken(user.id, username)

        return {
            name: user.name,
            username,
            token
        }
    }

    async register(data: RegisterDto) {
        if (data.key != '@ndrew') throw new ForbiddenException()
        const password = await this.passwordService.hashPassword(data.password)
        return this.userService.create({
            key: data.key,
            name: data.name,
            password,
            username: data.username
        })
    }

    async generateToken(userId: number, username: string): Promise<string> {
        const payload = { sub: userId, username };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('APP_KEY')
        });
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}
