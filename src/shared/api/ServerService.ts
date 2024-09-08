import config from '../../config';

export class ServerService {
  constructor(private baseUrl: string = config.apiUrl) {}
  
  async request(endpoint: RequestInfo | URL, options?: RequestInit) {
    
    try {

      const response = await fetch(this.baseUrl + endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });
  
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;

    } catch (error) {

      console.error('Ошибка при выполнении запроса:', error);
      throw error;
    }
  }
}
  