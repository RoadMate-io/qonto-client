import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface WebhookSubscription {
  id: UUID;
  organization_id: UUID;
  membership_id: UUID;
  callback_url: string;
  types: string[];
  created_at: string;
  updated_at: string;
  description?: string;
  secret?: string;
}

export interface ListWebhooksParams {
  page?: number;
  per_page?: number;
}

export interface ListWebhooksResponse {
  webhook_subscriptions: WebhookSubscription[];
  meta: PaginationMeta;
}

export interface WebhookResponse {
  webhook_subscription: WebhookSubscription;
}

export interface CreateWebhookParams {
  callback_url: string;
  types: string[];
  secret: string;
  description?: string;
}

export interface UpdateWebhookParams {
  callback_url?: string;
  types?: string[];
  description?: string;
}

export class WebhooksResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of webhook subscriptions.
   * GET /v2/webhook_subscriptions
   */
  async list(params?: ListWebhooksParams): Promise<ListWebhooksResponse> {
    const response = await this.http.get<ListWebhooksResponse>('/v2/webhook_subscriptions', { params });
    return response.data;
  }

  /**
   * Retrieves a specific webhook subscription.
   * GET /v2/webhook_subscriptions/:id
   */
  async retrieve(id: string): Promise<WebhookResponse> {
    const response = await this.http.get<WebhookResponse>(`/v2/webhook_subscriptions/${id}`);
    return response.data;
  }

  /**
   * Creates a new webhook subscription.
   * POST /v2/webhook_subscriptions
   */
  async create(data: CreateWebhookParams): Promise<WebhookResponse> {
    const response = await this.http.post<WebhookResponse>('/v2/webhook_subscriptions', data);
    return response.data;
  }

  /**
   * Updates an existing webhook subscription.
   * PUT /v2/webhook_subscriptions/:id
   */
  async update(id: string, data: UpdateWebhookParams): Promise<WebhookResponse> {
    const response = await this.http.put<WebhookResponse>(`/v2/webhook_subscriptions/${id}`, data);
    return response.data;
  }

  /**
   * Deletes a webhook subscription.
   * DELETE /v2/webhook_subscriptions/:id
   */
  async remove(id: string): Promise<void> {
    await this.http.delete(`/v2/webhook_subscriptions/${id}`);
  }
}
