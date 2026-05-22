import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface ClientInvoice {
  id: UUID;
  organization_id: UUID;
  status: 'draft' | 'finalized' | 'canceled' | 'paid' | string;
  invoice_type: string;
  number?: string;
  issue_date?: string;
  due_date?: string;
  created_at: ISODateTime;
  finalized_at?: ISODateTime | null;
  paid_at?: ISODateTime | null;
  currency: string;
  total_amount?: string;
  total_amount_cents?: number;
  vat_amount?: string;
  vat_amount_cents?: number;
  amount_paid?: string;
  contact_email?: string;
  invoice_url?: string;
  attachment_id?: UUID | null;
  client?: any; // Replace with proper client sub-object if available
  items?: any[];
  payment_methods?: string[];
  [key: string]: any; // Catch-all for remaining fields like footer, header, discount etc.
}

export interface ListClientInvoicesParams {
  'filter[status]'?: string;
  'filter[created_at_from]'?: string;
  'filter[created_at_to]'?: string;
  'filter[updated_at_from]'?: string;
  'filter[updated_at_to]'?: string;
  'filter[due_date]'?: string;
  'filter[due_date_from]'?: string;
  'filter[due_date_to]'?: string;
  exclude_imported?: boolean;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListClientInvoicesResponse {
  client_invoices: ClientInvoice[];
  meta: PaginationMeta;
}

export interface ClientInvoiceResponse {
  client_invoice: ClientInvoice;
}

export interface CreateClientInvoiceParams {
  client_invoice: Partial<ClientInvoice>;
}

export interface UpdateClientInvoiceParams {
  client_invoice: Partial<ClientInvoice>;
}

export interface SendClientInvoiceParams {
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject?: string;
  body?: string;
}

export class ClientInvoicesResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of client invoices.
   */
  async list(params?: ListClientInvoicesParams): Promise<ListClientInvoicesResponse> {
    const response = await this.http.get('/v2/client_invoices', { params });
    return response.data;
  }

  /**
   * Retrieve a specific client invoice.
   */
  async retrieve(id: string): Promise<ClientInvoiceResponse> {
    const response = await this.http.get(`/v2/client_invoices/${id}`);
    return response.data;
  }

  /**
   * Creates a draft client invoice.
   */
  async create(data: CreateClientInvoiceParams): Promise<ClientInvoiceResponse> {
    const response = await this.http.post('/v2/client_invoices', data);
    return response.data;
  }

  /**
   * Update a draft client invoice. Note that Qonto uses PATCH for this.
   */
  async update(id: string, data: UpdateClientInvoiceParams): Promise<ClientInvoiceResponse> {
    const response = await this.http.patch(`/v2/client_invoices/${id}`, data);
    return response.data;
  }

  /**
   * Delete a draft client invoice.
   */
  async remove(id: string): Promise<void> {
    await this.http.delete(`/v2/client_invoices/${id}`);
  }

  /**
   * Finalize a client invoice.
   */
  async finalize(id: string, data?: any): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/finalize`, data);
    return response.data;
  }

  /**
   * Mark a client invoice as paid.
   */
  async markAsPaid(id: string, data?: any): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/mark_as_paid`, data);
    return response.data;
  }

  /**
   * Unmark a client invoice as paid.
   */
  async unmarkAsPaid(id: string, data?: any): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/unmark_as_paid`, data);
    return response.data;
  }

  /**
   * Cancel a client invoice.
   */
  async cancel(id: string, data?: any): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/mark_as_canceled`, data);
    return response.data;
  }

  /**
   * Send a client invoice via email.
   */
  async send(id: string, data: SendClientInvoiceParams): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/send`, data);
    return response.data;
  }

  /**
   * Send a client invoice via e-invoice.
   */
  async sendByEinvoice(id: string, data?: any): Promise<ClientInvoiceResponse> {
    const response = await this.http.post(`/v2/client_invoices/${id}/send_by_einvoice`, data);
    return response.data;
  }

  /**
   * Create a client invoice upload.
   */
  async upload(data: any): Promise<any> {
    const response = await this.http.post('/v2/client_invoices/uploads', data);
    return response.data;
  }

  /**
   * Retrieve a client invoice upload.
   */
  async listUploads(id: string): Promise<any> {
    // Note: the endpoints use `id` to retrieve an individual upload status
    const response = await this.http.get(`/v2/client_invoices/uploads/${id}`);
    return response.data;
  }
}
