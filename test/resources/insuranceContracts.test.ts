import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { InsuranceContractsResource } from '../../src/resources/insuranceContracts';

describe('InsuranceContractsResource', () => {
  let mockAxios: MockAdapter;
  let resource: InsuranceContractsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new InsuranceContractsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list insurance contracts', async () => {
    const mockData = { insurance_contracts: [{ id: 'ic_123' }] };
    mockAxios.onGet('/v2/insurance_contracts').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve an insurance contract by card id', async () => {
    const mockData = { insurance_contract: { id: 'ic_123' } };
    mockAxios.onGet('/v2/insurance_contracts/ic_123').reply(200, mockData);
    const result = await resource.retrieve('ic_123');
    expect(result).toEqual(mockData);
  });
});
