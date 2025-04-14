import { makeNotification } from '@test/factories/notification/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { NotificationNotFoundError } from '../errors/notification/notification-not-found.error';
import { ReadNotification } from './read-notification.use-case';

describe('Leitura de Notificações', () => {
  it('Deve ser possível ler uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification({});

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toBeTruthy();
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Não deve ser capaz de ler uma notificação inexistente', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    await expect(
      readNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
