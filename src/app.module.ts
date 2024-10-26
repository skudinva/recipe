import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { TaxPayerModule } from './tax-payer/tax-payer.module';

@Module({
  imports: [PrismaModule, TaxPayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
