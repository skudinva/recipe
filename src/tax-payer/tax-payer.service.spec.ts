import { Test, TestingModule } from '@nestjs/testing';
import { TaxPayerService } from './tax-payer.service';

describe('TaxPayerService', () => {
  let service: TaxPayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxPayerService],
    }).compile();

    service = module.get<TaxPayerService>(TaxPayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
