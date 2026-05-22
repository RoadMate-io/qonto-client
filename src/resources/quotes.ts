import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface QuoteAmount {
  currency: string;
  value: string;
}

export interface QuoteItem {
  title: string;
  currency?: string;
  quantity?: string;
  unit_price: QuoteAmount;
  vat_rate?: string;
  description?: string;
  unit?: string;
  discount?: {
    type: string;
    value: string;
  };
  vat_exemption_reason?: string;
}

export interface Quote {
  id: UUID;
  status: string;
  issue_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
  currency: string;
  client_id: UUID;
  items: QuoteItem[];
  upload_id?: UUID;
  number?: string;
  header?: string;
  footer?: string;
  settings?: {
    vat_number?: string;
    district_court?: string;
    company_leadership?: string;
    commercial_register_number?: string;
    tax_number?: string;
  };
}

export interface ListQuotesParams {
  'filter[status]'?: string;
  'filter[created_at_from]'?: string;
  'filter[created_at_to]'?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListQuotesResponse {
  quotes: Quote[];
  meta: PaginationMeta;
}

export interface QuoteResponse {
  quote: Quote;
}

export interface CreateQuoteParams {
  issue_date: string;
  expiry_date: string;
  currency: string;
  client_id: UUID;
  items: QuoteItem[];
  terms_and_conditions?: string;
  upload_id?: UUID;
  number?: string;
  header?: string;
  footer?: string;
  settings?: {
    vat_number?: string;
    district_court?: string;
    company_leadership?: string;
    commercial_register_number?: string;
    tax_number?: string;
  };
  discount?: {
    type: string;
    value: string;
  };
  welfare_fund?: {
    type: string;
    rate: string;
  };
  withholding_tax?: {
    reason: string;
    rate: string;
    payment_reason?: string;
  };
  stamp_duty_amount?: string;
}

export interface SendQuoteParams {
  send_to: string[];
  email_title?: string;
  copy_to_self?: boolean;
  email_body?: string;
}

export class QuotesResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of quotes.
   * GET /v2/quotes
   */
  async list(params?: ListQuotesParams): Promise<ListQuotesResponse> {
    const response = await this.http.get<ListQuotesResponse>('/v2/quotes', { params });
    return response.data;
  }

  /**
   * Retrieves a specific quote.
   * GET /v2/quotes/:id
   */
  async retrieve(id: string): Promise<QuoteResponse> {
    const response = await this.http.get<QuoteResponse>(`/v2/quotes/${id}`);
    return response.data;
  }

  /**
   * Creates a new quote.
   * POST /v2/quotes
   */
  async create(data: CreateQuoteParams): Promise<QuoteResponse> {
    const response = await this.http.post<QuoteResponse>('/v2/quotes', data);
    return response.data;
  }

  /**
   * Deletes a specific quote.
   * DELETE /v2/quotes/:id
   */
  async delete(id: string): Promise<void> {
    await this.http.delete(`/v2/quotes/${id}`);
  }

  /**
   * Sends the quote identified by the ID via email to the specified recipients.
   * POST /v2/quotes/:id/send
   */
  async send(id: string, data: SendQuoteParams): Promise<void> {
    await this.http.post(`/v2/quotes/${id}/send`, data);
  }
}
