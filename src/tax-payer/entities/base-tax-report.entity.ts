import { TaxReportRow } from '../types/tax-report-row.type';

export class BaseTaxReportEntity {
  id: number;
  okud: string;
  data: TaxReportRow;
}
