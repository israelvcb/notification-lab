import { Notification } from '@app/entities/notification/notification';
import { NotificationRepository } from '@app/repositories/notification.repository';
import { PrismaService } from '../../prisma.service';

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
      },
    });
  }
}
