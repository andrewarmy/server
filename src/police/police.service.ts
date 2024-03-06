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

  findAll({ skip, take }: FilterQueryProps) {
    return this.prismaService.police.findMany({
      skip,
      take,
      select: { id: true, name: true, national_number: true, telephone_number: true, created_at: true, updated_at: true }
    });
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

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.police.delete({
      where: { id }
    })
  }
}
