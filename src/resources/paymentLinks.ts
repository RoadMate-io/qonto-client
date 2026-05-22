import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface PaymentLinkAmount {
  currency: string;
  value: string;
}

export interface PaymentLinkItem {
  title: string;
  quantity: number;
  unit_price: PaymentLinkAmount;
  vat_rate: string;
  type?: string;
  description?: string;
  measure_unit?: string;
}

export interface PaymentLink {
  id: UUID;
  status: string;
  expiration_date: string;
  potential_payment_methods: string[];
  amount: PaymentLinkAmount;
  created_at: string;
  url: string;
  resource_type: string;
  reusable?: boolean;
  items?: PaymentLinkItem[];
  invoice_id?: UUID;
  invoice_number?: string;
  debitor_name?: string;
}

export interface CreateBasketPaymentLinkParams {
  items: PaymentLinkItem[];
  reusable: boolean;
  potential_payment_methods: string[];
}

export interface CreateInvoicePaymentLinkParams {
  invoice_id: UUID;
  invoice_number: string;
  debitor_name: string;
  amount: PaymentLinkAmount;
  potential_payment_methods: string[];
}

export type CreatePaymentLinkParams = CreateBasketPaymentLinkParams | CreateInvoicePaymentLinkParams;

export interface ListPaymentLinksParams {
  page?: number;
  per_page?: number;
  status?: string[];
  sort_by?: string;
}

export interface ListPaymentLinksResponse {
  payment_links: PaymentLink[];
  meta: PaginationMeta;
}

export interface PaymentLinkResponse {
  payment_link: PaymentLink;
}

export interface PaymentLinkPayment {
  id: string;
  // Note: the Qonto payload definition defines payment attributes here but we omit the deep specifics for brevity unless needed.
  status: string;
  amount: PaymentLinkAmount;
  created_at: string;
}

export interface ListPaymentsResponse {
  payments: PaymentLinkPayment[];
  meta: PaginationMeta;
}

export class PaymentLinksResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of payment links.
   * GET /v2/payment_links
   */
  async list(params?: ListPaymentLinksParams): Promise<ListPaymentLinksResponse> {
    const response = await this.http.get<ListPaymentLinksResponse>('/v2/payment_links', { params });
    return response.data;
  }

  /**
   * Retrieves a specific payment link.
   * GET /v2/payment_links/:id
   */
  async retrieve(id: string): Promise<PaymentLinkResponse> {
    const response = await this.http.get<PaymentLinkResponse>(`/v2/payment_links/${id}`);
    return response.data;
  }

  /**
   * Create a payment link.
   * Supports either Basket (items, reusable) or Invoice (invoice_id, amount, debitor_name, invoice_number) configurations.
   * POST /v2/payment_links
   */
  async create(data: CreatePaymentLinkParams): Promise<PaymentLinkResponse> {
    const response = await this.http.post<PaymentLinkResponse>('/v2/payment_links', { payment_link: data });
    return response.data;
  }

  /**
   * Deactivate a payment link.
   * PATCH /v2/payment_links/:id/deactivate
   */
  async deactivate(id: string): Promise<PaymentLinkResponse> {
    const response = await this.http.patch<PaymentLinkResponse>(`/v2/payment_links/${id}/deactivate`);
    return response.data;
  }

  /**
   * List payments generated from a specific payment link.
   * GET /v2/payment_links/:id/payments
   */
  async listPayments(id: string, params?: ListPaymentLinksParams): Promise<ListPaymentsResponse> {
    const response = await this.http.get<ListPaymentsResponse>(`/v2/payment_links/${id}/payments`, { params });
    return response.data;
  }
}
