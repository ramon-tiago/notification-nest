import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to Cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientIdNotifications = new CountRecipientNotification(
      notificationsRepository,
    );

    const make = makeNotification({ recipientId: 'Id_top' });
    await notificationsRepository.create(make);
    await notificationsRepository.create(make);

    const { count } = await countRecipientIdNotifications.execute({
      recipientId: 'Id_top',
    });

    expect(count).toEqual(2);
  });
});
