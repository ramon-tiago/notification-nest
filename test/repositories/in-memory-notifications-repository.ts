import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (n) => n.id === notificationId,
    );
    if (!notification) return null;

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return await this.notifications.filter(
      (n) => n.recipientId === recipientId,
    );
  }

  async create(notification: Notification) {
    await this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (n) => n.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }
}
