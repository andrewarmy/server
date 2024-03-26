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

    @Get('all/:groupId')
    findAll(
        @Param('groupId') groupId: string,
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number,
        @Query('search') search?: string,
    ) {
        return this.cycleService.findAll({
            skip, take, search,
            where: { group_id: +groupId }
        });
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
    remove(@Query('id', ParseIntPipe) id: number) {
        console.log(id)
        return this.cycleService.remove(id);
    }
}
