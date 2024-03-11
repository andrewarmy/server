import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkDirectionDto } from './create-work-direction.dto';

export class UpdateWorkDirection extends PartialType(CreateWorkDirectionDto) { }
