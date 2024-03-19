import { PartialType } from '@nestjs/mapped-types';
import { CreateCivilianDto } from './create-civilian.dto';

export class UpdateCivilianDto extends PartialType(CreateCivilianDto) {}
