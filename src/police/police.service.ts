import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoliceDto } from './dto/create-police.dto';
import { UpdatePoliceDto } from './dto/update-police.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PoliceService {
  constructor(private readonly prismaService: PrismaService) { }

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
    let where = {}
    if (search) {
      const searchTerm = search.toLowerCase()
      const searchFields = ['name', 'national_number', 'telephone_number']
      const queryFields: any[] = searchFields.map((field) => ({ [field]: { contains: searchTerm } }))
      if (!isNaN(+searchTerm)) {
        queryFields.push({
          id: {
            equals: +searchTerm,
          },
        })
      }
      where = { OR: queryFields }
    }
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
