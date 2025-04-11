import { SendNotification } from '@app/use-cases/notification/send-notification.use-case';
import { NotificationViewModel } from '@infra/http/view-models/notification.view-model';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBodyDto } from '../../dtos/notification/create-notification-body.dto';

@Controller('notification')
export class NotificationController {
  constructor(private sendNotificationService: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBodyDto) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotificationService.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
