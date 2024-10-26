import { Expose } from 'class-transformer';
import { BfoTaxPayerEntity } from './bfo-tax-payer.entity';
import { LocationEntity } from './location.entity';
import { OkopfEntity } from './okopf.entity';
import { Okved2Entity } from './okved2.entity';

export class TaxPayerEntity {
  @Expose()
  id: string;

  @Expose()
  building: string;

  @Expose()
  city: string;

  @Expose()
  district: string;

  @Expose()
  house: string;

  @Expose()
  index: string;

  @Expose()
  inn: string;

  @Expose()
  office: string;

  @Expose()
  ogrn: string;

  @Expose()
  okato: string;

  @Expose()
  okfs: string;

  @Expose()
  okopf: OkopfEntity;

  @Expose()
  okpo: string;

  @Expose()
  okved2: Okved2Entity;

  @Expose()
  region: string;

  @Expose()
  settlement: string;

  @Expose()
  shortName: string;

  @Expose()
  statusCode: string;

  @Expose()
  statusDate: Date;

  @Expose()
  street: string;

  @Expose()
  bfo: BfoTaxPayerEntity[];

  @Expose()
  msp: boolean;

  @Expose()
  kpp: string;

  @Expose()
  fullName: string;

  @Expose()
  registrationDate: Date;

  @Expose()
  hasMsfo: boolean;

  @Expose()
  hasKfoNotification: boolean;

  @Expose()
  location: LocationEntity;

  @Expose()
  authorizedCapital: number;
}
