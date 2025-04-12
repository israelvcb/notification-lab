import { Content } from '@app/entities/notification/content';
import { Notification } from '@app/entities/notification/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { CancelNotification } from './cancel-notification.use-case';

describe('Cancelar Notificação', () => {
  it('Deve ser possível cancelar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Você tem uma nova solicitação de amizade!'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toBeTruthy();
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });
});
