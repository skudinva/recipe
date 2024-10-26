import { Test, TestingModule } from '@nestjs/testing';
import { TaxPayerController } from './tax-payer.controller';
import { TaxPayerService } from './tax-payer.service';

describe('TaxPayerController', () => {
  let controller: TaxPayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxPayerController],
      providers: [TaxPayerService],
    }).compile();

    controller = module.get<TaxPayerController>(TaxPayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
