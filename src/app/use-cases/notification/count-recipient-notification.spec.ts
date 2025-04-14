import { Content } from '@app/entities/notification/content';
import { Notification } from '@app/entities/notification/notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { CountRecipientNotification } from './count-recipient-notification.use-case';

describe('Contar notificações por recebedor ', () => {
  it('Deve ser possível contar as notificações por recebedor', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Você tem uma nova solicitação de amizade 1!'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Você tem uma nova solicitação de amizade 2!'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Você tem uma nova solicitação de amizade 3!'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
