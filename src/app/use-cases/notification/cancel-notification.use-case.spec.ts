import { makeNotification } from '@test/factories/notification/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { NotificationNotFoundError } from '../errors/notification/notification-not-found.error';
import { CancelNotification } from './cancel-notification.use-case';

describe('Cancelar Notificação', () => {
  it('Deve ser possível cancelar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toBeTruthy();
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Não deve ser capaz de cancelar uma notificação inexistente', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
