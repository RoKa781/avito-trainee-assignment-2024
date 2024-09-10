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

  async getAdvertisementsBySearch (currentPage: number, itemsPerPage: number, name: string) {
    const start = (currentPage - 1) * itemsPerPage;
    const endpoint = `/advertisements?_sort=-createdAt&_start=${start}&_limit=${itemsPerPage}&name=${name}`;
    return await this.request(endpoint);
  }

  async getAdvertisementsAllBySearch (name: string) {
    const endpoint = `/advertisements?_sort=-createdAt&name=${name}`;
    return await this.request(endpoint);
  }

  async getAdvertisementsByFilter(
    currentPage: number, 
    itemsPerPage: number,
    filterParams: Record<string, string | undefined>,
  ) {
    const start = (currentPage - 1) * itemsPerPage;
    let endpoint = `/advertisements?_sort=-createdAt&_start=${start}&_limit=${itemsPerPage}`;
  
    const queryParams = new URLSearchParams();
    Object.keys(filterParams).forEach(key => {
      const value = filterParams[key];
      if (value) {
        queryParams.set(`${key}_gte`, value);
      }
    });
  
    const queryString = `${queryParams.toString()}`;
    if (queryString) {
      endpoint += `&${queryString}`;
    }
  
    return await this.request(endpoint);
  }

  async getAllAdvertisementsByFilter(filterParams: Record<string, string | undefined>) {
    let endpoint = '/advertisements?_sort=-createdAt';
  
    const queryParams = new URLSearchParams();
    Object.keys(filterParams).forEach(key => {
      const value = filterParams[key];
      if (value) {
        queryParams.set(`${key}_gte`, value);
      }
    });
  
    const queryString = `${queryParams.toString()}`;
    if (queryString) {
      endpoint += `&${queryString}`;
    }
  
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
