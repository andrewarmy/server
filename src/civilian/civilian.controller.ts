import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CivilianService } from './civilian.service';
import { CreateCivilianDto } from './dto/create-civilian.dto';
import { UpdateCivilianDto } from './dto/update-civilian.dto';

@Controller('civilian')
export class CivilianController {
  constructor(private readonly policeService: CivilianService) { }

  @Post()
  create(@Body() createPoliceDto: CreateCivilianDto) {
    return this.policeService.create(createPoliceDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('search') search?: string,
  ) {
    return this.policeService.findAll({ skip, take, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliceDto: UpdateCivilianDto) {
    return this.policeService.update(+id, updatePoliceDto);
  }

  @Delete()
  remove(@Query('ids') ids: string) {
    const allId = ids?.split(',')?.map((id) => +id).filter(id => !isNaN(id) && id != 0) || []
    return this.policeService.remove(allId);
  }
}
