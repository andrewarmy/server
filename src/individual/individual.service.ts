import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndividualDto } from './dto/create-individual.dto';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IndividualService extends PrismaUtilService {

  constructor(protected readonly prismaService: PrismaService) {
    super({
      prismaService: prismaService.individual,
      selectColumns: { id: true, name: true, national_number: true, telephone_number: true },
    })
  }

  async create(createIndividualDto: CreateIndividualDto) {
    try {
      createIndividualDto.birth_date = new Date(createIndividualDto.birth_date)
      createIndividualDto.national_number = createIndividualDto.national_number || undefined
      return await this.prismaService.individual.create({
        data: createIndividualDto
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async update(id: number, updateIndividualDto: UpdateIndividualDto) {
    try {
      return await this.prismaService.individual.update({
        data: updateIndividualDto,
        where: { id }
      })
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
