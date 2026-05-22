import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { WebhooksResource, CreateWebhookParams, UpdateWebhookParams } from '../../src/resources/webhooks';

describe('WebhooksResource', () => {
  let mockAxios: MockAdapter;
  let webhooksResource: WebhooksResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    webhooksResource = new WebhooksResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list webhooks successfully', async () => {
    const mockData = {
      webhook_subscriptions: [{ id: 'wh_123', callback_url: 'https://test.com' }],
      meta: { current_page: 1, next_page: 2 }
    };
    mockAxios.onGet('/v2/webhook_subscriptions').reply(200, mockData);

    const result = await webhooksResource.list({ page: 1, per_page: 10 });
    expect(result).toEqual(mockData);
    expect(mockAxios.history.get[0].params).toEqual({ page: 1, per_page: 10 });
  });

  it('should retrieve a webhook', async () => {
    const mockData = { webhook_subscription: { id: 'wh_123' } };
    mockAxios.onGet('/v2/webhook_subscriptions/wh_123').reply(200, mockData);

    const result = await webhooksResource.retrieve('wh_123');
    expect(result).toEqual(mockData);
  });

  it('should create a webhook', async () => {
    const payload: CreateWebhookParams = {
      callback_url: 'https://test.com/hook',
      secret: 'secret123',
      types: ['v1/transactions']
    };
    const mockResponse = { webhook_subscription: { id: 'wh_123', ...payload } };
    mockAxios.onPost('/v2/webhook_subscriptions').reply(201, mockResponse);

    const result = await webhooksResource.create(payload);
    expect(result).toEqual(mockResponse);
    expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(payload);
  });

  it('should update a webhook', async () => {
    const payload: UpdateWebhookParams = { description: 'Updated' };
    const mockResponse = { webhook_subscription: { id: 'wh_123', description: 'Updated' } };
    mockAxios.onPut('/v2/webhook_subscriptions/wh_123').reply(200, mockResponse);

    const result = await webhooksResource.update('wh_123', payload);
    expect(result).toEqual(mockResponse);
    expect(JSON.parse(mockAxios.history.put[0].data)).toEqual(payload);
  });

  it('should delete a webhook', async () => {
    mockAxios.onDelete('/v2/webhook_subscriptions/wh_123').reply(204);
    await expect(webhooksResource.remove('wh_123')).resolves.toBeUndefined();
  });
});
