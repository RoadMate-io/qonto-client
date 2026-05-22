import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OrganizationsResource } from '../../src/resources/organizations';

describe('OrganizationsResource', () => {
  let mockAxios: MockAdapter;
  let resource: OrganizationsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new OrganizationsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should retrieve a specific organization (deprecated)', async () => {
    const mockData = { organization: { id: 'org_123' } };
    mockAxios.onGet('/v2/organizations/org_123').reply(200, mockData);
    const result = await resource.show('org_123');
    expect(result).toEqual(mockData);
  });

  it('should retrieve current organization', async () => {
    const mockData = { organization: { id: 'org_current' } };
    mockAxios.onGet('/v2/organization').reply(200, mockData);
    const result = await resource.getCurrent();
    expect(result).toEqual(mockData);
  });
});
