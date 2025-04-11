import { NotificationRepository } from '@app/repositories/notification.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/notification/prisma-notification.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'NotificationRepository',
      useExisting: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DataBaseModule {}
