import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Post()
    create(@Body() CreateGroupDto: CreateGroupDto) {
        return this.groupService.create(CreateGroupDto);
    }

    @Get()
    findAll(
        @Query('skip', ParseIntPipe) skip: number,
        @Query('take', ParseIntPipe) take: number,
        @Query('search') search?: string,
    ) {
        return this.groupService.findAll({ skip, take, search });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.groupService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupService.update(+id, updateGroupDto);
    }

    @Delete()
    remove(@Query('ids') ids: string) {
        const allId = ids?.split(',')?.map((id) => +id).filter(id => !isNaN(id) && id != 0) || []
        return this.groupService.remove(allId);
    }
}
