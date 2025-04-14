import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notification.repository';
import { NotificationNotFoundError } from '../errors/notification/notification-not-found.error';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    notificationData: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = notificationData;
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
