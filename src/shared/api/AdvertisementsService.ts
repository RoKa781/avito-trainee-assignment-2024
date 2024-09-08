import { ServerService } from './ServerService';

export class AdvertisementsService extends ServerService {
  async getAdvertisements(currentPage: number, itemsPerPage: number) {
    const start = (currentPage - 1) * itemsPerPage;
    const endpoint = `/advertisements?_sort=-createdAt&_start=${start}&_limit=${itemsPerPage}`;
    return await this.request(endpoint);
  }

  async getTotalAdvertisements() {
    const endpoint = '/advertisements';
    return await this.request(endpoint);
  }

  async addAdvertisement(advertisementData: {
    name: string,
    price: number, 
    createdAt: string,
    views: number,
    likes: number,
    imageUrl: string
  }) {
    const endpoint = '/advertisements';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(advertisementData),
    };
    return await this.request(endpoint, options);
  }
}

export const advertisementsService = new AdvertisementsService();
