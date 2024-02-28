import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsUserGuard } from './guards/is-user.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    AuthService,
    JwtService,
    {
      provide: 'APP_GUARD',
      useClass: IsUserGuard
    }
  ],
  controllers: [AuthController],
})
export class AuthModule { }
