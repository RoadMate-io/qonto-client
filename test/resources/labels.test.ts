import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LabelsResource } from '../../src/resources/labels';

describe('LabelsResource', () => {
  let mockAxios: MockAdapter;
  let resource: LabelsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new LabelsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list labels', async () => {
    const mockData = { labels: [{ id: 'lab_123' }] };
    mockAxios.onGet('/v2/labels').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });
});
