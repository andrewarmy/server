import { SetMetadata } from '@nestjs/common';

export const Audit = (message: string) => SetMetadata('audit', { message });