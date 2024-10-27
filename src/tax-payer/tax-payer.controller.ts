import { Controller, Get, Param } from '@nestjs/common';
import { TaxPayerEntity } from './entities/tax-payer.entity';
import { TaxPayerService } from './tax-payer.service';

@Controller('tax-payer')
export class TaxPayerController {
  constructor(private readonly taxPayerService: TaxPayerService) {}

  @Get('/search/:query')
  search(@Param('query') query: string): Promise<TaxPayerEntity[]> {
    return this.taxPayerService.search(query);
  }

  @Get('/nbo/id/:id')
  getNboById(@Param('id') id: string): Promise<TaxPayerEntity> {
    return this.taxPayerService.getNboByOrganizationId(id);
  }

  @Get('/nbo/inn/:inn')
  getNboByInn(@Param('inn') inn: string): Promise<TaxPayerEntity> {
    return this.taxPayerService.getNboByOrganizationInn(inn);
  }

  @Get('/bfo/id/:id')
  getBfoById(@Param('id') id: string): Promise<any[]> {
    return this.taxPayerService.getBfoByOrganizationId(id);
  }

  @Get('/bfo/inn/:inn')
  getBfoByInn(@Param('inn') inn: string): Promise<any[]> {
    return this.taxPayerService.getBfoByOrganizationInn(inn);
  }
}
