import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { SendNotification } from './send-notification.use-case';

describe('Enviar Notificação', () => {
  it('Deve ser possível enviar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Você tem uma nova solicitação de amizade!',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications).toBeInstanceOf(Object);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
