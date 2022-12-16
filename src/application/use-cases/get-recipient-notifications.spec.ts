import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to Cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientIdNotifications = new GetRecipientNotification(
      notificationsRepository,
    );

    const make = makeNotification({ recipientId: 'Id_top' });
    await notificationsRepository.create(make);
    await notificationsRepository.create(make);

    const { notifications } = await getRecipientIdNotifications.execute({
      recipientId: 'Id_top',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'Id_top' }),
        expect.objectContaining({ recipientId: 'Id_top' }),
      ]),
    );
  });
});
