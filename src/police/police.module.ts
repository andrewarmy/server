import { Module } from '@nestjs/common';
import { PoliceService } from './police.service';
import { PoliceController } from './police.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PoliceController],
  providers: [PoliceService, PrismaService],
})
export class PoliceModule { }
