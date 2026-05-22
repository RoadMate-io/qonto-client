import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClientInvoicesResource, CreateClientInvoiceParams } from '../../src/resources/clientInvoices';

describe('ClientInvoicesResource', () => {
  let mockAxios: MockAdapter;
  let resource: ClientInvoicesResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new ClientInvoicesResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list client invoices', async () => {
    const mockData = { client_invoices: [{ id: 'inv_123' }] };
    mockAxios.onGet('/v2/client_invoices').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a client invoice', async () => {
    const mockData = { client_invoice: { id: 'inv_123' } };
    mockAxios.onGet('/v2/client_invoices/inv_123').reply(200, mockData);
    const result = await resource.retrieve('inv_123');
    expect(result).toEqual(mockData);
  });

  it('should create a client invoice', async () => {
    const payload: CreateClientInvoiceParams = { 
      client_invoice: { client_id: '123', due_date: '2023-01-01', issue_date: '2023-01-01', locale: 'en' } 
    };
    const mockData = { client_invoice: { id: 'inv_123' } };
    mockAxios.onPost('/v2/client_invoices').reply(201, mockData);
    const result = await resource.create(payload);
    expect(result).toEqual(mockData);
  });

  it('should update a client invoice', async () => {
    const payload = { locale: 'fr' };
    const mockData = { client_invoice: { id: 'inv_123' } };
    mockAxios.onPatch('/v2/client_invoices/inv_123').reply(200, mockData);
    const result = await resource.update('inv_123', {client_invoice: payload});
    expect(result).toEqual(mockData);
  });
});
