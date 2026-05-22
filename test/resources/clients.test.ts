import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ClientsResource, CreateClientParams, UpdateClientParams } from '../../src/resources/clients';

describe('ClientsResource', () => {
  let mockAxios: MockAdapter;
  let resource: ClientsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new ClientsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list clients', async () => {
    const mockData = { clients: [{ id: 'cl_123' }] };
    mockAxios.onGet('/v2/clients').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a client', async () => {
    const mockData = { client: { id: 'cl_123' } };
    mockAxios.onGet('/v2/clients/cl_123').reply(200, mockData);
    const result = await resource.retrieve('cl_123');
    expect(result).toEqual(mockData);
  });

  it('should create a client', async () => {
    const payload: CreateClientParams = { 
      type: 'company', name: 'Test', locale: 'en', currency: 'EUR' 
    };
    const mockData = { client: { id: 'cl_123' } };
    mockAxios.onPost('/v2/clients').reply(201, mockData);
    const result = await resource.create(payload);
    expect(result).toEqual(mockData);
  });

  it('should update a client', async () => {
    const payload: UpdateClientParams = { locale: 'fr' };
    const mockData = { client: { id: 'cl_123' } };
    mockAxios.onPatch('/v2/clients/cl_123').reply(200, mockData);
    const result = await resource.update('cl_123', payload);
    expect(result).toEqual(mockData);
  });

  it('should delete a client', async () => {
    mockAxios.onDelete('/v2/clients/cl_123').reply(204);
    await expect(resource.remove('cl_123')).resolves.toBeUndefined();
  });
});
