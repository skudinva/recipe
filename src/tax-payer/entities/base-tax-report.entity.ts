import { TaxReportRowEntity } from './tax-report-row.entity';

export class BaseTaxReportEntity {
  id: number;
  okud: string;
  report: TaxReportRowEntity[];
}
