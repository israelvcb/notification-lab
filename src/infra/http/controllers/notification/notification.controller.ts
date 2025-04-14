import { CancelNotification } from '@app/use-cases/notification/cancel-notification.use-case';
import { CountRecipientNotification } from '@app/use-cases/notification/count-recipient-notification.use-case';
import { GetRecipientNotification } from '@app/use-cases/notification/get-recipient-notification.use-case';
import { ReadNotification } from '@app/use-cases/notification/read-notification.use-case';
import { SendNotification } from '@app/use-cases/notification/send-notification.use-case';
import { UnReadNotification } from '@app/use-cases/notification/unread-notification.use-case';
import { NotificationViewModel } from '@infra/http/view-models/notification.view-model';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBodyDto } from '../../dtos/notification/create-notification-body.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unReadNotification: UnReadNotification,
    private countFromRecipientId: CountRecipientNotification,
    private getFromRecipientId: GetRecipientNotification,
  ) {}

  @Patch('cancel/:notificationId')
  async cancel(@Param('notificationId') notificationId: string) {
    await this.cancelNotification.execute({
      notificationId,
    });
  }

  @Get('count/from-recipientId/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countFromRecipientId.execute({
      recipientId,
    });
    return {
      count,
    };
  }

  @Get('from-recipientId/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getFromRecipientId.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationViewModel.toHTTP(notification),
      ),
    };
  }

  @Patch('read/:notificationId')
  async read(@Param('notificationId') notificationId: string) {
    await this.readNotification.execute({
      notificationId,
    });
  }

  @Patch('unread/:notificationId')
  async unread(@Param('notificationId') notificationId: string) {
    await this.unReadNotification.execute({
      notificationId,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBodyDto) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
