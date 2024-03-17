import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoliceDto } from './dto/create-police.dto';
import { UpdatePoliceDto } from './dto/update-police.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';

@Injectable()
export class PoliceService extends PrismaUtilService {

  async create(createPoliceDto: CreatePoliceDto) {
    try {
      createPoliceDto.birth_date = new Date(createPoliceDto.birth_date)
      createPoliceDto.national_number = createPoliceDto.national_number || undefined
      return await this.prismaService.police.create({
        data: createPoliceDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async findAll({ skip, take, search }: FilterQueryProps) {
    const where = await this.searchQuery(search, ['name', 'national_number', 'telephone_number'])
    const data = await this.prismaService.police.findMany({
      skip,
      take,
      where,
      select: { id: true, name: true, national_number: true, telephone_number: true, police_number: true }
    });

    return {
      data,
      total: (await this.prismaService.police.count({ where }))
    }
  }

  async findOne(id: number) {
    const police = await this.prismaService.police.findUnique({ where: { id } })
    if (!police) throw new NotFoundException()
    return police
  }

  async update(id: number, updatePoliceDto: UpdatePoliceDto) {
    try {
      return await this.prismaService.police.update({
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
      await this.prismaService.police.delete({
        where: { id }
      })
    }
    return 'deleted'
  }
}
