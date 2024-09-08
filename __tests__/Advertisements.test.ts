import { AdvertisementsService } from './../src/shared/api/AdvertisementsService';
import config from '../src/config';
import fetchMock from 'jest-fetch-mock';
import { Advertisment } from '../src/utlis/types';

const mockAdvertisements: Advertisment[] = [
  {
    id: '1',
    name: 'Объявление 1',
    price: 1000,
    createdAt: '2023-08-12T20:16:55.351Z',
    views: 0,
    likes: 0,
    imageUrl: '',
  },
  {
    id: '2',
    name: 'Объявление 2',
    price: 2000,
    createdAt: '2023-08-15T10:16:55.351Z',
    views: 0,
    likes: 0,
    imageUrl: '',
  },
];

fetchMock.enableMocks();

describe('AdvertisementsService', () => {
  let advertisementsService: AdvertisementsService;

  beforeEach(() => {
    fetchMock.resetMocks();
    advertisementsService = new AdvertisementsService();
  });

  describe('getAdvertisements', () => {
    it('должен корректно запрашивать список объявлений с параметрами', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockAdvertisements));

      const currentPage = 1;
      const itemsPerPage = 10;
      const ads = await advertisementsService.getAdvertisements(currentPage, itemsPerPage);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements?_sort=-createdAt&_start=0&_limit=10`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(ads).toEqual(mockAdvertisements);
    });

    it('должен корректно запрашивать объявления для другой страницы', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockAdvertisements));

      const currentPage = 2;
      const itemsPerPage = 5;
      const ads = await advertisementsService.getAdvertisements(currentPage, itemsPerPage);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements?_sort=-createdAt&_start=5&_limit=5`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(ads).toEqual(mockAdvertisements);
    });

    it('должен корректно обрабатывать ошибки при запросе объявлений', async () => {
      fetchMock.mockRejectOnce(new Error('Server error'));

      await expect(advertisementsService.getAdvertisements(1, 10)).rejects.toThrow('Server error');
    });
  });

  describe('getTotalAdvertisements', () => {
    it('должен корректно возвращать полный список объявлений', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockAdvertisements));

      const totalAds = await advertisementsService.getTotalAdvertisements();

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(totalAds).toEqual(mockAdvertisements);
    });

    it('должен корректно обрабатывать ошибки при запросе полного списка', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch advertisements'));

      await expect(advertisementsService.getTotalAdvertisements()).rejects.toThrow('Failed to fetch advertisements');
    });
  });

  describe('addAdvertisement', () => {
    it('должен корректно добавлять новое объявление', async () => {
      const newAd = {
        name: 'Объявление 3',
        price: 3000,
        createdAt: '2023-09-01T10:00:00.000Z',
        views: 0,
        likes: 0,
        imageUrl: '',
      };

      fetchMock.mockResponseOnce(JSON.stringify(newAd));

      const addedAd = await advertisementsService.addAdvertisement(newAd);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(newAd),
      });
      expect(addedAd).toEqual(newAd);
    });

    it('должен корректно обрабатывать ошибки при добавлении объявления', async () => {
      const newAd = {
        name: 'Объявление 4',
        price: 4000,
        createdAt: '2023-09-01T10:00:00.000Z',
        views: 0,
        likes: 0,
        imageUrl: '',
      };

      fetchMock.mockRejectOnce(new Error('Failed to add advertisement'));

      await expect(advertisementsService.addAdvertisement(newAd)).rejects.toThrow('Failed to add advertisement');
    });
  });
});
