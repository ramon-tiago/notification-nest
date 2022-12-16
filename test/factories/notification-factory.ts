import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export const makeNotification = (override: Override = {}) =>
  new Notification({
    category: 'social',
    content: new Content('Nova solicitação.'),
    recipientId: 'recipient-01',
    ...override,
  });
