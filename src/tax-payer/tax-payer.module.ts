import { Module } from '@nestjs/common';
import { TaxPayerService } from './tax-payer.service';
import { TaxPayerController } from './tax-payer.controller';

@Module({
  controllers: [TaxPayerController],
  providers: [TaxPayerService],
})
export class TaxPayerModule {}
