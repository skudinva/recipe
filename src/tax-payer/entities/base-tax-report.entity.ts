import { TaxReportRow } from '../types/tax-report-row.type';

export class BaseTaxReportEntity {
  [key: string]: any;
  id: number;
  okud: string;
  data: TaxReportRow;
}
