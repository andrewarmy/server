import { Module } from '@nestjs/common';
import { WorkDirectionService } from './work-direction.service';
import { WorkDirectionController } from './work-direction.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkDirectionController],
  providers: [WorkDirectionService, PrismaService],
})
export class WorkDirectionModule { }
