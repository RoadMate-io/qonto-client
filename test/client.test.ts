import { describe, it, expect } from 'vitest';
import { createHttpClient, QontoApiError } from '../src/client';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('createHttpClient', () => {
  it('should initialize correctly with default base url', () => {
    const client = createHttpClient('test-login', 'test-secret');
    expect(client.defaults.baseURL).toBe('https://thirdparty.qonto.com');
    expect(client.defaults.headers.Authorization).toBe('test-login:test-secret');
  });

  it('should format errors properly', async () => {
    const client = createHttpClient('test-login', 'test-secret');
    const mockAxios = new MockAdapter(client);
    
    mockAxios.onGet('/v2/test').reply(400, { message: 'Bad request' });
    
    await expect(client.get('/v2/test')).rejects.toThrow(QontoApiError);
  });
});
