import { ReportPeriodCode } from '../report-period-code.enum';

export class TaxReportRowEntity {
  rowNo: string;
  reportPeriod: ReportPeriodCode;
  summa: number;
}
