import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDirectionDto } from './dto/create-work-direction.dto';
import { UpdateWorkDirection } from './dto/update-work-direction.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';

@Injectable()
export class WorkDirectionService extends PrismaUtilService {
  async create(createWorkDirectionDto: CreateWorkDirectionDto) {
    try {
      return await this.prismaService.workDirection.create({
        data: createWorkDirectionDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async findAll({ skip, take, search }: FilterQueryProps) {
    const where = this.searchQuery(search, ['name'])
    const data = await this.prismaService.workDirection.findMany({
      skip,
      take,
      where,
      select: { id: true, name: true }
    });

    return {
      data,
      total: (await this.prismaService.workDirection.count({ where }))
    }
  }

  async findOne(id: number) {
    const workDirection = await this.prismaService.workDirection.findUnique({ where: { id } })
    if (!workDirection) throw new NotFoundException()
    return workDirection
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

  async remove(ids: number[]) {
    for (const id of ids) {
      await this.findOne(id)
      await this.prismaService.workDirection.delete({
        where: { id }
      })
    }
    return 'deleted'
  }
}
