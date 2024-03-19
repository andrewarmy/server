import { Module } from '@nestjs/common';
import { CivilianService } from './civilian.service';
import { CivilianController } from './civilian.controller';

@Module({
  controllers: [CivilianController],
  providers: [CivilianService],
})
export class CivilianModule { }
