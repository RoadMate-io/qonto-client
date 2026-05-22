import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { InternationalTransfersResource } from '../../src/resources/internationalTransfers';

describe('InternationalTransfersResource', () => {
  let mockAxios: MockAdapter;
  let resource: InternationalTransfersResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new InternationalTransfersResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list international currencies', async () => {
    const mockData = { currencies: [{ source_currency: 'EUR' }] };
    mockAxios.onGet('/v2/international/currencies').reply(200, mockData);
    const result = await resource.listCurrencies();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a quote', async () => {
    const mockData = { quote: { source_currency: 'EUR', target_currency: 'USD' } };
    mockAxios.onGet('/v2/international/quotes/quote_123').reply(200, mockData);
    const result = await resource.getQuote('quote_123');
    expect(result).toEqual(mockData);
  });
});
