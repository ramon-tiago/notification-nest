import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'Number01',
      content: new Content('Você recebeu uma solicitação de amizade'),
      category: 'Top d+',
    });
    expect(notification).toBeTruthy();
  });
});
