import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../../repositories/notification.repository';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

type CountRecipientNotificationResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    notificationData: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = notificationData;

    const count =
      await this.notificationRepository.countManyByRecipientId(recipientId);

    return {
      count,
    };
  }
}
