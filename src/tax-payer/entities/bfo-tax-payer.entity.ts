import { Expose } from 'class-transformer';

export class BfoTaxPayerEntity {
  @Expose()
  period: number;

  @Expose()
  publication: number;

  @Expose()
  actualBfoDate: Date;

  @Expose()
  gainSum: number;

  @Expose()
  knd: string;

  @Expose()
  hasAz: boolean;

  @Expose()
  hasKs: boolean;

  @Expose()
  actualCorrectionNumber: number;

  @Expose()
  actualCorrectionDate: Date;

  @Expose()
  publishedCorrectionNumber: number;

  @Expose()
  publishedCorrectionDate: Date;

  @Expose()
  actives: number;

  @Expose()
  isCb: boolean;

  @Expose()
  mspCategory: boolean;

  @Expose()
  published: boolean;
}
