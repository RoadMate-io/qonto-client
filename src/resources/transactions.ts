import { AxiosInstance } from 'axios';
import { Transaction, UUID, PaginationMeta, ListTransactionsParams, Attachment, ListAttachmentsParams } from '../types';

export class TransactionsResource {
  constructor(private readonly http: AxiosInstance) {}

  /** GET /v2/transactions */
  async list(params?: ListTransactionsParams): Promise<{ transactions: Transaction[]; meta: PaginationMeta }> {
    const response = await this.http.get('/v2/transactions', { params });
    return response.data;
  }

  /** GET /v2/transactions/:id */
  async retrieve(id: UUID): Promise<{ transaction: Transaction }> {
    const response = await this.http.get(`/v2/transactions/${id}`);
    return response.data;
  }

  /**
   * Upload an attachment to a transaction
   * POST /v2/transactions/:id/attachments
   */
  async uploadAttachment(id: UUID, formData: any, headers?: Record<string, string>): Promise<void> {
    await this.http.post(`/v2/transactions/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    });
  }

  /**
   * List attachments for a transaction
   * GET /v2/transactions/:id/attachments
   */
  async listAttachments(id: UUID, params?: ListAttachmentsParams): Promise<{ attachments: Attachment[]; meta: PaginationMeta }> {
    const response = await this.http.get(`/v2/transactions/${id}/attachments`, { params });
    return response.data;
  }
}