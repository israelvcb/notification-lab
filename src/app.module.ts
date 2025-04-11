import { DataBaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DataBaseModule, HttpModule],
})
export class AppModule {}
