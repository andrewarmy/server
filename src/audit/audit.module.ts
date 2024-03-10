import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuditInterceptor } from './audit.interceptor';

@Module({
    providers: [
        PrismaService,
        {
            provide: APP_INTERCEPTOR,
            useClass: AuditInterceptor,
        }
    ]
})
export class AuditModule {
}
