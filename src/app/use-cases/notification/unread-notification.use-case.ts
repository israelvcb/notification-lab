import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notification.repository';
import { NotificationNotFoundError } from '../errors/notification/notification-not-found.error';

interface UnReadNotificationRequest {
  notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    notificationData: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = notificationData;
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unRead();

    await this.notificationRepository.save(notification);
  }
}
