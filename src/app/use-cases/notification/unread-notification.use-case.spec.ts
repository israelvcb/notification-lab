import { makeNotification } from '@test/factories/notification/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { NotificationNotFoundError } from '../errors/notification/notification-not-found.error';
import { ReadNotification } from './read-notification.use-case';
import { UnReadNotification } from './unread-notification.use-case';

describe('Remover Leitura de Notificações', () => {
  it('Deve ser possível remover a leitura de uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unReadNotification = new UnReadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unReadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('Não deve ser capaz de remover a leitura uma notificação inexistente', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unReadNotification = new ReadNotification(notificationsRepository);

    await expect(
      unReadNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
