import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface SupplierInvoiceAmount {
  value: string;
  currency: string;
}

export interface SupplierInvoice {
  id: UUID;
  status: string;
  supplier_name?: string;
  invoice_number?: string;
  issue_date?: string;
  due_date?: string;
  payable_amount?: SupplierInvoiceAmount;
  currency?: string;
  taxes?: Array<{
    amount: string;
    rate: string;
  }>;
  created_at: string;
  updated_at: string;
  attachment_id?: UUID;
  document_type?: string;
}

export interface ListSupplierInvoicesParams {
  'filter[status]'?: string;
  'filter[due_date]'?: string;
  'filter[attachment_id]'?: string;
  'filter[attachment_id][]'?: string[];
  'filter[created_at_from]'?: string;
  'filter[created_at_to]'?: string;
  'filter[updated_at_from]'?: string;
  'filter[updated_at_to]'?: string;
  'filter[payment_date]'?: string;
  'filter[issue_date]'?: string;
  'filter[missing_data]'?: boolean;
  'filter[matched_transactions]'?: boolean;
  'filter[document_type]'?: string;
  'filter[document_type][]'?: string[];
  'filter[approver_id][]'?: string[];
  'filter[issue_date_from]'?: string;
  'filter[exclude_credit_notes]'?: boolean;
  'filter[payable_amount]'?: string;
  query?: string;
  query_fields?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListSupplierInvoicesResponse {
  supplier_invoices: SupplierInvoice[];
  meta: PaginationMeta;
}

export interface SupplierInvoiceResponse {
  supplier_invoice: SupplierInvoice;
}

export interface BulkCreateSupplierInvoicesResponse {
  successes: any[];
  errors: any[];
}

export class SupplierInvoicesResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of supplier invoices.
   * GET /v2/supplier_invoices
   */
  async list(params?: ListSupplierInvoicesParams): Promise<ListSupplierInvoicesResponse> {
    const response = await this.http.get<ListSupplierInvoicesResponse>('/v2/supplier_invoices', { params });
    return response.data;
  }

  /**
   * Retrieves a specific supplier invoice.
   * GET /v2/supplier_invoices/:id
   */
  async retrieve(id: string): Promise<SupplierInvoiceResponse> {
    const response = await this.http.get<SupplierInvoiceResponse>(`/v2/supplier_invoices/${id}`);
    return response.data;
  }

  /**
   * Create supplier invoices in bulk using multipart/form-data.
   * Due to Node.js environments, you must provide a FormData instance directly.
   * POST /v2/supplier_invoices/bulk
   */
  async createBulk(data: any): Promise<BulkCreateSupplierInvoicesResponse> {
    const response = await this.http.post<BulkCreateSupplierInvoicesResponse>('/v2/supplier_invoices/bulk', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Marks a supplier invoice as paid.
   * POST /v2/supplier_invoices/:id/mark_as_paid
   */
  async markAsPaid(id: string): Promise<SupplierInvoiceResponse> {
    const response = await this.http.post<SupplierInvoiceResponse>(`/v2/supplier_invoices/${id}/mark_as_paid`);
    return response.data;
  }

  /**
   * Unmarks a supplier invoice as paid.
   * POST /v2/supplier_invoices/:id/unmark_as_paid
   */
  async unmarkAsPaid(id: string): Promise<SupplierInvoiceResponse> {
    const response = await this.http.post<SupplierInvoiceResponse>(`/v2/supplier_invoices/${id}/unmark_as_paid`);
    return response.data;
  }

  /**
   * Rejects a supplier invoice.
   * POST /v2/supplier_invoices/:id/reject
   */
  async reject(id: string, reason?: string): Promise<SupplierInvoiceResponse> {
    const response = await this.http.post<SupplierInvoiceResponse>(`/v2/supplier_invoices/${id}/reject`, { reason });
    return response.data;
  }
}
