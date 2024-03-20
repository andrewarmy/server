import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoliceDto } from './dto/create-police.dto';
import { UpdatePoliceDto } from './dto/update-police.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PoliceService extends PrismaUtilService {

  constructor(protected readonly prismaService: PrismaService) {
    super({
      prismaService: prismaService.police,
      selectColumns: { id: true, name: true, position: true, national_number: true, telephone_number: true, police_number: true },
    })
  }

  async create(createPoliceDto: CreatePoliceDto) {
    try {
      createPoliceDto.national_number = createPoliceDto.national_number || undefined
      return await this.prismaService.police.create({
        data: createPoliceDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
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
}
