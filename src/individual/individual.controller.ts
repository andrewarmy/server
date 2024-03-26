import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { IndividualService } from './individual.service';
import { CreateIndividualDto } from './dto/create-individual.dto';
import { UpdateIndividualDto } from './dto/update-individual.dto';

@Controller('individual')
export class IndividualController {
  constructor(private readonly individualService: IndividualService) { }

  @Post()
  create(@Body() createIndividualDto: CreateIndividualDto) {
    return this.individualService.create(createIndividualDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('search') search?: string,
  ) {
    return this.individualService.findAll({ skip, take, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualService.findOne(+id, { include: { workDirection: true } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndividualDto: UpdateIndividualDto) {
    return this.individualService.update(+id, updateIndividualDto);
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.individualService.remove(id);
  }
}
