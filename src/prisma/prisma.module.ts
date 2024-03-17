import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUtilService } from './prisma-util.service';

@Global()
@Module({
    controllers: [],
    providers: [
        PrismaService, PrismaUtilService,
    ],
    exports: [PrismaService, PrismaUtilService]
})
export class PrismaModule { }
