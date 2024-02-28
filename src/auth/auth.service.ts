import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async login(credentials: LoginDto) {
        const { username, password } = credentials
        
    }

    async generateToken(userId: number, username: string): Promise<string> {
        const payload = { sub: userId, username };
        return this.jwtService.sign(payload);
    }

    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}
