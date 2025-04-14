import { makeNotification } from '@test/factories/notification/notification.factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { GetRecipientNotification } from './get-recipient-notification.use-case';

describe('Obter notificações por recebedor ', () => {
  it('Deve ser possível obter as notificações por recebedor', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
