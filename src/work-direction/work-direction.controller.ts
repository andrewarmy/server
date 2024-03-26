import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { WorkDirectionService } from './work-direction.service';
import { CreateWorkDirectionDto } from './dto/create-work-direction.dto';
import { UpdateWorkDirection } from './dto/update-work-direction.dto';

@Controller('work-direction')
export class WorkDirectionController {
  constructor(private readonly workDirection: WorkDirectionService) { }

  @Post()
  create(@Body() createWorkDirection: CreateWorkDirectionDto) {
    return this.workDirection.create(createWorkDirection);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('search') search?: string,
  ) {
    return this.workDirection.findAll({ skip, take, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workDirection.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDirection: UpdateWorkDirection) {
    return this.workDirection.update(+id, updateWorkDirection);
  }

  @Delete()
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.workDirection.remove(id);
  }
}
