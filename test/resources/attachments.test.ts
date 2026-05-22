import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AttachmentsResource } from '../../src/resources/attachments';

describe('AttachmentsResource', () => {
  let mockAxios: MockAdapter;
  let resource: AttachmentsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new AttachmentsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should retrieve an attachment', async () => {
    const mockData = {
      attachment: {
        id: 'att_123',
        file_name: 'invoice.pdf',
        file_size: '1024',
        file_content_type: 'application/pdf',
        url: 'https://example.com/invoice.pdf',
        created_at: '2023-01-01T00:00:00.000Z'
      }
    };
    mockAxios.onGet('/v2/attachments/att_123').reply(200, mockData);

    const result = await resource.retrieve('att_123');
    expect(result).toEqual(mockData);
  });
});
