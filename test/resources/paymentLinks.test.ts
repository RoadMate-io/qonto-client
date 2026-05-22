import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PaymentLinksResource } from '../../src/resources/paymentLinks';

describe('PaymentLinksResource', () => {
  let mockAxios: MockAdapter;
  let resource: PaymentLinksResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new PaymentLinksResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list payment links', async () => {
    const mockData = { payment_links: [{ id: 'pl_123' }] };
    mockAxios.onGet('/v2/payment_links').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a payment link', async () => {
    const mockData = { payment_link: { id: 'pl_123' } };
    mockAxios.onGet('/v2/payment_links/pl_123').reply(200, mockData);
    const result = await resource.retrieve('pl_123');
    expect(result).toEqual(mockData);
  });
});
