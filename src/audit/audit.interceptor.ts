import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly prismaService: PrismaService) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const auditParams = Reflect.getMetadata('audit', context.getHandler());
        const request = context.switchToHttp().getRequest()
        const message = auditParams?.message || `[${request.method}] ${request.route.path}`

        const audit = await this.prismaService.audit.create({
            data: {
                action: message,
                ip: request.ip,
            }
        })

        return next
            .handle().pipe(tap({
                next: async () => {
                    await this.prismaService.audit.update({
                        where: { id: audit.id },
                        data: { success: true }
                    })
                },
                error: async () => {
                    await this.prismaService.audit.update({
                        where: { id: audit.id },
                        data: { success: false }
                    })
                },
            }),)
    }
}