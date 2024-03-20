import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService extends PrismaUtilService {

    constructor(protected readonly prismaService: PrismaService) {
        super({
            prismaService: prismaService.group,
            selectColumns: { id: true, name: true },
        })
    }

    async create(createGruop: CreateGroupDto) {
        try {
            return await this.prismaService.group.create({
                data: createGruop
            })
        } catch (e) {
            throw new BadRequestException()
        }
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        try {
            return await this.prismaService.group.update({
                data: updateGroupDto,
                where: { id }
            })
        } catch (e) {
            throw new BadRequestException()
        }
    }
}
