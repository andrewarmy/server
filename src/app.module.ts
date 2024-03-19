import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PoliceModule } from './police/police.module';
import { AuditModule } from './audit/audit.module';
import { WorkDirectionModule } from './work-direction/work-direction.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PoliceModule,
    // WorkDirectionModule,
    AuditModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})
export class AppModule {
}
