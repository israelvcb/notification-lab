import { CancelNotification } from '@app/use-cases/notification/cancel-notification.use-case';
import { CountRecipientNotification } from '@app/use-cases/notification/count-recipient-notification.use-case';
import { GetRecipientNotification } from '@app/use-cases/notification/get-recipient-notification.use-case';
import { ReadNotification } from '@app/use-cases/notification/read-notification.use-case';
import { SendNotification } from '@app/use-cases/notification/send-notification.use-case';
import { UnReadNotification } from '@app/use-cases/notification/unread-notification.use-case';
import { DataBaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification/notification.controller';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    GetRecipientNotification,
    CancelNotification,
    UnReadNotification,
    ReadNotification,
    CountRecipientNotification,
  ],
})
export class HttpModule {}
