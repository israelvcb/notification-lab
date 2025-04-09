import { Module } from '@nestjs/common';
import { AppController } from './infra/app.controller';
import { AppService } from './infra/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
