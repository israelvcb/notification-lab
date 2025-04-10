import { Notification } from '../../entities/notification/notification';
import { SendNotification } from './send-notification-use-case';

const notifications: Notification[] = [];

const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
    return Promise.resolve();
  },
};
describe('Enviar Notificação', () => {
  it('Deve ser possível enviar uma notificação', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      category: 'social',
      content: 'Você tem uma nova solicitação de amizade!',
      recipientId: 'example-recipient-id',
    });

    expect(notifications).toBeTruthy();
    expect(notifications).toHaveLength(1);
    expect(notifications).toBeInstanceOf(Object);
  });
});
