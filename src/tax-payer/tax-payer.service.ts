import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { nalogServer } from 'src/const';
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
  async getOrganizationByInn(inn: string): Promise<TaxPayerEntity> {
    const organizations = await this.search(inn);
    if (organizations.length === 0) {
      throw new Error(`Organization with INN ${inn} not found`);
    } else if (organizations.length > 1) {
      throw new Error(`Multiple organizations with INN ${inn} found`);
    }
    return organizations[0];
  }

  async search(query: string): Promise<TaxPayerEntity[]> {
    const res = await fetch(
      `${nalogServer}/advanced-search/organizations/search?query=${query}`,
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
    const res = await fetch(`${nalogServer}/nbo/organizations/${id}`);
    const data: ResponseData = await res.json();
    clearTagsFromObjectValue(data);
    datefyObjectValue(data);
    return plainToInstance(TaxPayerEntity, data, {
      excludeExtraneousValues: true,
    });
  }

  async getNboByOrganizationInn(inn: string): Promise<TaxPayerEntity> {
    const organization = await this.getOrganizationByInn(inn);
    return this.getNboByOrganizationId(organization.id);
  }

  async getBfoByOrganizationId(id: string): Promise<any[]> {
    const res = await fetch(`${nalogServer}/nbo/organizations/${id}/bfo`);
    const data: any[] = await res.json();
    clearTagsFromObjectValue(data);
    datefyObjectValue(data);
    return data;
  }

  async getBfoByOrganizationInn(inn: string): Promise<any[]> {
    const organization = await this.getOrganizationByInn(inn);
    return this.getBfoByOrganizationId(organization.id);
  }
}
