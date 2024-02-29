import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    findOne(username: string) {
        return this.prisma.user.findFirst({
            where: { username }
        })
    }

    async create({ key, ...data }: RegisterDto) {
        const isExist = await this.prisma.user.count({
            where: { username: data.username }
        })
        if (isExist != 0) throw new ForbiddenException('Username should be unqiue')
        return this.prisma.user.create({ data })
    }
}
