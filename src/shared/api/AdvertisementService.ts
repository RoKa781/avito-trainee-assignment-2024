import { Advertisment } from '../../utlis/types';
import { ServerService } from './ServerService';

export class AdvertisementService extends ServerService {
  async getAdvertisement(id: string) {
    const endpoint = `/advertisements/${id}`;
    return await this.request(endpoint);
  }

  async updateAdvertisement(id: string, formData:Partial<Advertisment>) {
    const endpoint = `/advertisements/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    return await this.request(endpoint, options);
  }
}

export const advertisementService = new AdvertisementService();
