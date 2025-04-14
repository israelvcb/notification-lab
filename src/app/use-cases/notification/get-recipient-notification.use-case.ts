import { Notification } from '@app/entities/notification/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notification.repository';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

type GetRecipientNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    notificationData: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = notificationData;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
