import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Injectable()
export class CycleService extends PrismaUtilService {

    constructor(protected readonly prismaService: PrismaService) {
        super({
            prismaService: prismaService.cycle,
            selectColumns: { id: true, name: true, start_date: true, end_date: true },
            smartSearch: {
                name: 'string',
                start_date: 'date',
                end_date: 'date'
            }
        })
    }

    async create(createCycle: CreateCycleDto) {
        try {
            return await this.prismaService.cycle.create({
                data: createCycle
            })
        } catch (e) {
            throw new BadRequestException()
        }
    }

    async update(id: number, updateCycleDto: UpdateCycleDto) {
        try {
            return await this.prismaService.cycle.update({
                data: updateCycleDto,
                where: { id }
            })
        } catch (e) {
            throw new BadRequestException()
        }
    }
}
