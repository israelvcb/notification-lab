import { NotificationNotFoundError } from '@app/use-cases/errors/notification/notification-not-found.error';
import { Notification } from '../entities/notification/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;

  abstract findById(
    notificationId: string,
  ): Promise<Notification | null | NotificationNotFoundError>;

  abstract save(notification: Notification): Promise<void>;
}
