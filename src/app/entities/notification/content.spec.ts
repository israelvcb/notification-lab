import { Content } from './content';

describe('Conteúdo da Notificação', () => {
  it('Deve ser possível criar uma notificação com conteúdo válido', () => {
    expect(() => {
      new Content('Você tem uma nova solicitação de amizade!');
    }).toBeTruthy();
  });

  it('Não deve ser possível criar uma notificação com menos de 5 caracteres', () => {
    expect(() => new Content('1234')).toThrow();
  });

  it('Não deve ser possível criar uma notificação com mais de 240 caracteres', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
