import { ClassConstructor, plainToInstance } from 'class-transformer';
import { datePatterns } from 'src/const';
import { BaseTaxReportEntity } from 'src/tax-payer/entities/base-tax-report.entity';
import { ReportPeriodCode } from 'src/tax-payer/types/report-period-code.enum';

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function isObjectHasProperty(object: Object, key: string): boolean {
  return (
    object !== undefined &&
    object !== null &&
    !Array.isArray(object) &&
    object.hasOwnProperty(key)
  );
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
    Boolean(str.match(datePatterns[0])) || Boolean(str.match(datePatterns[1]))
  );
}

export function datefyObjectValue(object: Record<string, any>) {
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => {
        datefyObjectValue(item);
      });
    } else if (typeof value === 'object' && value !== null) {
      datefyObjectValue(value);
    } else if (typeof value === 'string' && isDateString(value)) {
      object[key] = new Date(value).toISOString();
    }
  });
}

export function nullifyObjectValue(object: Record<string, any>) {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && object[key] === null) {
      delete object[key];
    }
  });
}

function getPeriodKey(key: string): ReportPeriodCode {
  const periodKey = Object.keys(ReportPeriodCode).find(
    (period) => key === period,
  );
  if (!periodKey) {
    throw new Error(`Invalid report period key: ${key}`);
  }
  return ReportPeriodCode[periodKey as keyof typeof ReportPeriodCode];
}

export function convertFlatReportToNested(report: Record<string, any>): void {
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

export function transformBfoResponse(data: any[]): void {
  data.forEach((element) => {
    Object.entries(element.correction).forEach(([_key, value]) => {
      isObjectHasProperty(value, 'okud') && convertFlatReportToNested(value);
    });
  });
}
