import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CycleService } from './cycle.service';
import { CreateCycleDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Controller('cycle')
export class CycleController {
    constructor(private readonly cycleService: CycleService) { }

    @Post()
    create(@Body() createCycleDto: CreateCycleDto) {
        return this.cycleService.create(createCycleDto);
    }

    @Get()
    findAll(
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number,
        @Query('search') search?: string,
    ) {
        return this.cycleService.findAll({ skip, take, search });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cycleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCycleDto: UpdateCycleDto) {
        return this.cycleService.update(+id, updateCycleDto);
    }

    @Delete()
    remove(@Query('ids') ids: string) {
        const allId = ids?.split(',')?.map((id) => +id).filter(id => !isNaN(id) && id != 0) || []
        return this.cycleService.remove(allId);
    }
}
