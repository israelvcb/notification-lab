import { DataBaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataBaseModule],
})
export class AppModule {}
