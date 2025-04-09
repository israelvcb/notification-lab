import { SendNotification } from './send-notification';

describe('Enviar Notificação', () => {
  it('Deve ser possível enviar uma notificação', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Você tem uma nova solicitação de amizade!',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
    expect(notification).toBeInstanceOf(Object);
  });
});
