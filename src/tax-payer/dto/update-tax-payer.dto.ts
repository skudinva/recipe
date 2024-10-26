import { PartialType } from '@nestjs/swagger';
import { CreateTaxPayerDto } from './create-tax-payer.dto';

export class UpdateTaxPayerDto extends PartialType(CreateTaxPayerDto) {}
