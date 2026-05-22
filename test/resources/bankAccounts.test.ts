import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BankAccountsResource } from '../../src/resources/bankAccounts';

describe('BankAccountsResource', () => {
  let mockAxios: MockAdapter;
  let resource: BankAccountsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new BankAccountsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list bank accounts', async () => {
    const mockData = {
      bank_accounts: [{ id: 'ba_123', iban: 'FR123', bic: '123' }],
    };
    mockAxios.onGet('/v2/bank_accounts').reply(200, mockData);

    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a single bank account', async () => {
    const mockData = { bank_account: { id: 'ba_123' } };
    mockAxios.onGet('/v2/bank_accounts/ba_123').reply(200, mockData);

    const result = await resource.retrieve('ba_123');
    expect(result).toEqual(mockData);
  });
});
