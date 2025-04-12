import { Notification } from '@app/entities/notification/notification';
import { NotificationRepository } from '@app/repositories/notification.repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../../mappers/prisma-notification.mapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
