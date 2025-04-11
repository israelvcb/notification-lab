import { SendNotification } from '@app/use-cases/notification/send-notification.use-case';
import { DataBaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification/notification.controller';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
