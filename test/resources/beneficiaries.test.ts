import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BeneficiariesResource, CreateBeneficiaryParams, UpdateBeneficiaryParams } from '../../src/resources/beneficiaries';

describe('BeneficiariesResource', () => {
  let mockAxios: MockAdapter;
  let resource: BeneficiariesResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new BeneficiariesResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list beneficiaries', async () => {
    const mockData = {
      beneficiaries: [{ id: 'ben_123', name: 'John Doe' }],
      meta: { current_page: 1, next_page: null, per_page: 10, prev_page: null, total_count: 1, total_pages: 1 }
    };
    mockAxios.onGet('/v2/sepa/beneficiaries').reply(200, mockData);

    const result = await resource.list({ iban: 'FR1234567890' });
    expect(result).toEqual(mockData);
    expect(mockAxios.history.get[0].params).toEqual({ iban: 'FR1234567890' });
  });

  it('should retrieve a beneficiary', async () => {
    const mockData = { beneficiary: { id: 'ben_123' } };
    mockAxios.onGet('/v2/sepa/beneficiaries/ben_123').reply(200, mockData);

    const result = await resource.retrieve('ben_123');
    expect(result).toEqual(mockData);
  });

  it('should create a beneficiary', async () => {
    const payload: CreateBeneficiaryParams = { beneficiary:{name: 'John', iban: 'FR123', bic: '123'} };
    const mockData = { beneficiary: { id: 'ben_123', ...payload } };
    mockAxios.onPost('/v2/sepa/beneficiaries').reply(201, mockData);

    const result = await resource.create(payload);
    expect(result).toEqual(mockData);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(payload);
  });

  it('should update a beneficiary', async () => {
    const payload: UpdateBeneficiaryParams = {beneficiary: { name: 'Jane' } };
    const mockData = { beneficiary: { id: 'ben_123', name: 'Jane' } };
    mockAxios.onPut('/v2/sepa/beneficiaries/ben_123').reply(200, mockData);

    const result = await resource.update('ben_123', payload);
    expect(result).toEqual(mockData);
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(payload);
  });

  it('should delete a beneficiary', async () => {
    mockAxios.onDelete('/v2/sepa/beneficiaries/ben_123').reply(204);
    await expect(resource.remove('ben_123')).resolves.toBeUndefined();
  });
});
