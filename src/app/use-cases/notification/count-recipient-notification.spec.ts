import { makeNotification } from '@test/factories/notification/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { CountRecipientNotification } from './count-recipient-notification.use-case';

describe('Contar notificações por recebedor ', () => {
  it('Deve ser possível contar as notificações por recebedor', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
