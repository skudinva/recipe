import { ReportPeriodCode } from './report-period-code.enum';

export type TaxReportRow = Record<
  string,
  Partial<Record<ReportPeriodCode, number>>
>;
