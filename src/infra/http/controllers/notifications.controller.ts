import { Controller, Body, Post, Patch, Param, Get } from '@nestjs/common';

import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({ notificationId });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFromrecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({ notificationId });
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({ notificationId });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute(body);
    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
