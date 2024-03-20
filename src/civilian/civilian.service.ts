import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCivilianDto } from './dto/create-civilian.dto';
import { UpdateCivilianDto } from './dto/update-civilian.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CivilianService extends PrismaUtilService {

  constructor(protected readonly prismaService: PrismaService) {
    super({
      prismaService: prismaService.civilian,
      selectColumns: { id: true, name: true, national_number: true, telephone_number: true },
    })
  }

  async create(createCivilianDto: CreateCivilianDto) {
    try {
      return await this.prismaService.civilian.create({
        data: createCivilianDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async update(id: number, updateCivilianDto: UpdateCivilianDto) {
    try {
      return await this.prismaService.civilian.update({
        data: updateCivilianDto,
        where: { id }
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
