import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  clearTagsFromObjectValue,
  datefyObjectValue,
} from 'src/helpers/common';
import { TaxPayerEntity } from './entities/tax-payer.entity';

interface ResponseData {
  content: TaxPayerEntity[];
}

@Injectable()
export class TaxPayerService {
  async search(query: string): Promise<TaxPayerEntity[]> {
    const res = await fetch(
      `https://bo.nalog.ru/advanced-search/organizations/search?query=${query}`,
    );
    const data: ResponseData = await res.json();

    return data.content.map((element) => {
      clearTagsFromObjectValue(element);
      datefyObjectValue(element);
      return plainToInstance(TaxPayerEntity, element, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getNboByOrganizationId(id: string): Promise<TaxPayerEntity> {
    const res = await fetch(`https://bo.nalog.ru/nbo/organizations/${id}`);
    const data: ResponseData = await res.json();
    clearTagsFromObjectValue(data);
    datefyObjectValue(data);
    return plainToInstance(TaxPayerEntity, data, {
      excludeExtraneousValues: true,
    });
  }

  async getNboByOrganizationInn(inn: string): Promise<TaxPayerEntity> {
    const organizations = await this.search(inn);
    if (organizations.length === 0) {
      throw new Error(`Organization with INN ${inn} not found`);
    } else if (organizations.length > 1) {
      throw new Error(`Multiple organizations with INN ${inn} found`);
    }
    return this.getNboByOrganizationId(organizations[0].id);
  }

  async getBfoByOrganizationId(id: string): Promise<any[]> {
    const res = await fetch(`https://bo.nalog.ru/nbo/organizations/${id}/bfo`);
    const data: any[] = await res.json();
    clearTagsFromObjectValue(data);
    datefyObjectValue(data);
    return data;
  }

  async getBfoByOrganizationInn(inn: string): Promise<any[]> {
    const organizations = await this.search(inn);
    if (organizations.length === 0) {
      throw new Error(`Organization with INN ${inn} not found`);
    } else if (organizations.length > 1) {
      throw new Error(`Multiple organizations with INN ${inn} found`);
    }
    return this.getBfoByOrganizationId(organizations[0].id);
  }
}
