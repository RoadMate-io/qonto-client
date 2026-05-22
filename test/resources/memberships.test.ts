import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MembershipsResource } from '../../src/resources/memberships';

describe('MembershipsResource', () => {
  let mockAxios: MockAdapter;
  let resource: MembershipsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new MembershipsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list memberships', async () => {
    const mockData = { memberships: [{ id: 'mem_123' }] };
    mockAxios.onGet('/v2/memberships').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });
});
