import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndividualDto } from './dto/create-individual.dto';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IndividualService extends PrismaUtilService {
  readonly includeCycles = {
    select: {
      assigned_at: true,
      cycle: {
        select: {
          name: true, group: {
            select: {
              name: true
            }
          }
        }
      },
    }
  }
  
  constructor(protected readonly prismaService: PrismaService) {
    super({
      prismaService: prismaService.individual,
      selectColumns: { id: true, name: true, position: true, national_number: true, telephone_number: true },
      smartSearch: {
        name: 'string',
        position: 'string',
        national_number: 'string',
        telephone_number: 'string',
      }
    })
  }

  async create(createIndividualDto: CreateIndividualDto) {
    try {
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
