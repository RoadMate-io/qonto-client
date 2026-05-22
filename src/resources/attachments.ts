import { AxiosInstance } from 'axios';
import { Attachment, UUID, PaginationMeta, ListAttachmentsParams } from '../types';

export class AttachmentsResource {
  constructor(private readonly http: AxiosInstance) {}

  /** GET /v2/transactions/:transactionId/attachments */
  async listForTransaction(transactionId: UUID, params?: ListAttachmentsParams): Promise<{ attachments: Attachment[]; meta: PaginationMeta }> {
    const response = await this.http.get(`/v2/transactions/${transactionId}/attachments`, { params });
    return response.data;
  }

  /** DELETE /v2/transactions/:transactionId/attachments */
  async removeAllFromTransaction(transactionId: UUID): Promise<void> {
    await this.http.delete(`/v2/transactions/${transactionId}/attachments`);
  }

  /** GET /v2/attachments */
  async list(params?: ListAttachmentsParams): Promise<{ attachments: Attachment[]; meta: PaginationMeta }> {
    const response = await this.http.get('/v2/attachments', { params });
    return response.data;
  }

  /** GET /v2/attachments/:id */
  async retrieve(id: UUID): Promise<{ attachment: Attachment }> {
    const response = await this.http.get(`/v2/attachments/${id}`);
    return response.data;
  }

  /** POST /v2/attachments (multipart) */
  async create(body: FormData): Promise<{ attachment: Attachment }> {
    const response = await this.http.post('/v2/attachments', body, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  /** DELETE /v2/attachments/:id */
  async remove(id: UUID): Promise<void> {
    await this.http.delete(`/v2/attachments/${id}`);
  }
}