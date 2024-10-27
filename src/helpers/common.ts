import { ClassConstructor, plainToInstance } from 'class-transformer';
import { BaseTaxReportEntity } from 'src/tax-payer/entities/base-tax-report.entity';
import { ReportPeriodCode } from 'src/tax-payer/types/report-period-code.enum';

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function clearTagsFromObjectValue(object: any) {
  const clearTags = ['<strong>', '</strong>'];
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      clearTagsFromObjectValue(object[key]);
    } else if (typeof object[key] === 'string' && object[key].length > 0) {
      clearTags.map((tag) => {
        object[key] = object[key].replace(tag, '');
      });
    }
  });
}

export function isDateString(str: string): boolean {
  return (
    Boolean(
      str.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/),
    ) ||
    Boolean(
      str.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/),
    )
  );
}

export function datefyObjectValue(object: Object) {
  Object.keys(object).forEach((key) => {
    const value = object[key];

    if (typeof value === 'object' && value !== null) {
      datefyObjectValue(value);
    } else if (typeof value === 'string' && isDateString(value)) {
      object[key] = new Date(value).toISOString();
    }
  });
}

export function nullifyObjectValue(object: any) {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && object[key] === null) {
      delete object[key];
    }
  });
}

function getPeriodKey(key: string): ReportPeriodCode {
  const periodKey = Object.keys(ReportPeriodCode).find((period) =>
    key.startsWith(period),
  );
  return ReportPeriodCode[periodKey];
}

export function convertFlatReportToNested(report: Object): void {
  const nestedReport: BaseTaxReportEntity = report['data'] || {};
  Object.entries(report).forEach(([key, value]) => {
    const periodKey = getPeriodKey(key);
    if (periodKey) {
      const rowNo = key.replace(periodKey, '');
      nestedReport[rowNo] = nestedReport[rowNo] || {};
      nestedReport[rowNo][periodKey] = value;
      delete report[key];
    }
  });
  report['data'] = nestedReport;
}
