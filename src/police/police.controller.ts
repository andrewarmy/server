import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PoliceService } from './police.service';
import { CreatePoliceDto } from './dto/create-police.dto';
import { UpdatePoliceDto } from './dto/update-police.dto';

@Controller('police')
export class PoliceController {
  constructor(private readonly policeService: PoliceService) { }

  @Post()
  create(@Body() createPoliceDto: CreatePoliceDto) {
    return this.policeService.create(createPoliceDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number
  ) {
    return this.policeService.findAll({ skip, take });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliceDto: UpdatePoliceDto) {
    return this.policeService.update(+id, updatePoliceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policeService.remove(+id);
  }
}
