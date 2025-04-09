import { Content } from './content';
import { Notification } from './notification';

describe('Notificação', () => {
  it('Deve ser possível criar uma notificação', () => {
    expect(() => {
      new Notification({
        content: new Content('Você tem uma nova solicitação de amizade!'),
        category: 'social',
        recipientId: 'example-recipient-id',
        readAt: null,
      });
    }).toBeTruthy();
  });
});
