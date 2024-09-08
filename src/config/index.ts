type Environment = 'development' | 'production';

const config: Record<Environment, { apiUrl: string }> = {
  development: {
    apiUrl: 'http://localhost:3001',
  },
  production: {
    apiUrl: 'http://localhost:3001',
  },
};

const environment = 'development';

export default config[environment];
