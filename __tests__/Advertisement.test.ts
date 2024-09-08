import { AdvertisementService } from './../src/shared/api/AdvertisementService';
import fetchMock from 'jest-fetch-mock';
import { Advertisment } from '../src/utlis/types';
import config from '../src/config';

const mockAdvertisement: Advertisment = {
  id: '1',
  name: 'Объявление 1',
  price: 1000,
  createdAt: '2023-08-12T20:16:55.351Z',
  views: 1200,
  likes: 340,
  imageUrl: '',
};

fetchMock.enableMocks();

describe('AdvertisementService', () => {
  let advertisementService: AdvertisementService;

  beforeEach(() => {
    fetchMock.resetMocks();
    advertisementService = new AdvertisementService();
  });

  describe('getAdvertisement', () => {
    it('должен корректно запрашивать объявление по ID', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockAdvertisement));

      const adId = '1';
      const advertisement = await advertisementService.getAdvertisement(adId);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements/${adId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      expect(advertisement).toEqual(mockAdvertisement);
    });

    it('должен корректно обрабатывать ошибку при запросе объявления', async () => {
      const adId = '1';
      fetchMock.mockRejectOnce(new Error('Failed to fetch advertisement'));

      await expect(advertisementService.getAdvertisement(adId)).rejects.toThrow('Failed to fetch advertisement');
    });
  });

  describe('updateAdvertisement', () => {
    it('должен корректно обновлять объявление по ID', async () => {
      const adId = '1';
      const updatedData: Partial<Advertisment> = {
        name: 'Обновленное объявление',
        price: 2000,
      };

      fetchMock.mockResponseOnce(JSON.stringify({ ...mockAdvertisement, ...updatedData }));

      const updatedAdvertisement = await advertisementService.updateAdvertisement(adId, updatedData);

      expect(fetchMock).toHaveBeenCalledWith(`${config.apiUrl}/advertisements/${adId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      expect(updatedAdvertisement).toEqual({ ...mockAdvertisement, ...updatedData });
    });

    it('должен корректно обрабатывать ошибку при обновлении объявления', async () => {
      const adId = '1';
      const updatedData: Partial<Advertisment> = {
        name: 'Обновленное объявление',
        price: 2000,
      };

      fetchMock.mockRejectOnce(new Error('Failed to update advertisement'));

      await expect(advertisementService.updateAdvertisement(adId, updatedData)).rejects.toThrow(
        'Failed to update advertisement',
      );
    });
  });
});
