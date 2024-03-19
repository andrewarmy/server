import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDirectionDto } from './dto/create-work-direction.dto';
import { UpdateWorkDirection } from './dto/update-work-direction.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkDirectionService extends PrismaUtilService {

  constructor(protected readonly prismaService: PrismaService) {
    super({
      prismaService: prismaService.workDirection,
      selectColumns: { name: true },
    })
  }

  async create(createWorkDirectionDto: CreateWorkDirectionDto) {
    try {
      return await this.prismaService.workDirection.create({
        data: createWorkDirectionDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async update(id: number, updatePoliceDto: UpdateWorkDirection) {
    try {
      return await this.prismaService.workDirection.update({
        data: updatePoliceDto,
        where: { id }
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
