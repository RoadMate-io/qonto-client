import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { InternalTransfersResource } from '../../src/resources/internalTransfers';

describe('InternalTransfersResource', () => {
  let mockAxios: MockAdapter;
  let resource: InternalTransfersResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new InternalTransfersResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should create an internal transfer', async () => {
    const mockData = { transaction: { id: 'tr_123' } };
    mockAxios.onPost('/v2/internal_transfers').reply(201, mockData);
    const result = await resource.create({ internal_transfer: { debit_iban: 'a', credit_iban: 'b', amount: 10, currency: 'EUR' }});
    expect(result).toEqual(mockData);
  });
});
