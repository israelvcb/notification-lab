import { Notification } from '@app/entities/notification/notification';
import { NotificationRepository } from '@app/repositories/notification.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
      },
    });
  }
}
