import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CreditNotesResource } from '../../src/resources/creditNotes';

describe('CreditNotesResource', () => {
  let mockAxios: MockAdapter;
  let resource: CreditNotesResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new CreditNotesResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list credit notes', async () => {
    const mockData = { client_credit_notes: [{ id: 'cn_123' }] };
    mockAxios.onGet('/v2/credit_notes').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a credit note', async () => {
    const mockData = { client_credit_note: { id: 'cn_123' } };
    mockAxios.onGet('/v2/credit_notes/cn_123').reply(200, mockData);
    const result = await resource.retrieve('cn_123');
    expect(result).toEqual(mockData);
  });

  it('should create a credit note', async () => {
    const payload = { amount: 100, currency: 'EUR' };
    const mockData = { client_credit_note: { id: 'cn_123' } };
    mockAxios.onPost('/v2/credit_notes').reply(201, mockData);
    const result = await resource.create(payload as any);
    expect(result).toEqual(mockData);
  });
});
