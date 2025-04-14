import { Notification } from 'src/app/entities/notification/notification';
import { NotificationRepository } from 'src/app/repositories/notification.repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return Promise.resolve(notification);
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
    return Promise.resolve();
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
    return Promise.resolve();
  }
}
