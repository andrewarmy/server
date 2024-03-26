import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CivilianService } from './civilian.service';
import { CreateCivilianDto } from './dto/create-civilian.dto';
import { UpdateCivilianDto } from './dto/update-civilian.dto';

@Controller('civilian')
export class CivilianController {
  constructor(private readonly civilianService: CivilianService) { }

  @Post()
  create(@Body() createCivilianDto: CreateCivilianDto) {
    return this.civilianService.create(createCivilianDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('search') search?: string,
  ) {
    return this.civilianService.findAll({ skip, take, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.civilianService.findOne(+id, { include: { workDirection: true } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCivilianDto: UpdateCivilianDto) {
    return this.civilianService.update(+id, updateCivilianDto);
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.civilianService.remove(id);
  }
}
