import { Content } from '../../entities/notification/content';
import { Notification } from '../../entities/notification/notification';
import { NotificationRepository } from '../../repositories/notification-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    notificationData: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = notificationData;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
