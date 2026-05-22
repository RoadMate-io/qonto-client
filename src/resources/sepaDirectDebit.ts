import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface SepaAmount {
  value: string;
  currency: string;
}

export interface DirectDebitMandate {
  id: UUID;
  unique_mandate_reference: string;
  client_id: UUID;
  status: string;
  created_at: string;
  mandate_signature_date?: string;
  schedule_type: string;
  notify_client?: boolean;
  sign_url?: string;
}

export interface DirectDebitSubscription {
  id: UUID;
  direct_debit_mandate_id: UUID;
  bank_account_id: UUID;
  initial_collection_date: string;
  amount: SepaAmount;
  reference?: string;
  status: string;
  schedule_type: string;
  notify_client?: boolean;
  created_at: string;
  sign_url?: string;
}

export interface ListMandatesParams {
  page?: number;
  per_page?: number;
  client_id?: UUID;
}

export interface ListMandatesResponse {
  direct_debit_mandates: DirectDebitMandate[];
  meta: PaginationMeta;
}

export interface MandateResponse {
  direct_debit_mandate: DirectDebitMandate;
}

export interface CreateMandateParams {
  client_id: UUID;
  payment_info: {
    first_payment: {
      collection_date: string;
      amount: SepaAmount;
      reference?: string;
    };
    notify_client?: boolean;
    schedule_type: string;
  };
  send_mandate_signature_email?: boolean;
}

export interface ListSubscriptionsParams {
  page?: number;
  per_page?: number;
  direct_debit_mandate_id?: UUID;
  status?: string[];
}

export interface ListSubscriptionsResponse {
  direct_debit_subscriptions: DirectDebitSubscription[];
  meta: PaginationMeta;
}

export interface SubscriptionResponse {
  direct_debit_subscription: DirectDebitSubscription;
}

export interface CreateSubscriptionParams {
  client_id: UUID;
  bank_account_id: UUID;
  initial_collection_date: string;
  amount: SepaAmount;
  reference?: string;
  notify_client?: boolean;
  schedule_type: string;
  direct_debit_mandate_id?: UUID;
  send_mandate_signature_email?: boolean;
}

export class SepaDirectDebitResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * List all SEPA Direct Debit mandates.
   * GET /v2/sepa/direct_debit_mandates
   */
  async listMandates(params?: ListMandatesParams): Promise<ListMandatesResponse> {
    const response = await this.http.get<ListMandatesResponse>('/v2/sepa/direct_debit_mandates', { params });
    return response.data;
  }

  /**
   * Get a specific SEPA Direct Debit mandate.
   * GET /v2/sepa/direct_debit_mandates/:id
   */
  async getMandate(id: string): Promise<MandateResponse> {
    const response = await this.http.get<MandateResponse>(`/v2/sepa/direct_debit_mandates/${id}`);
    return response.data;
  }

  /**
   * Create a SEPA Direct Debit mandate.
   * POST /v2/sepa/direct_debit_mandates
   */
  async createMandate(data: CreateMandateParams): Promise<MandateResponse> {
    const response = await this.http.post<MandateResponse>('/v2/sepa/direct_debit_mandates', {
      direct_debit_mandate: data
    });
    return response.data;
  }

  /**
   * List all SEPA Direct Debit subscriptions.
   * GET /v2/sepa/direct_debit_subscriptions
   */
  async listSubscriptions(params?: ListSubscriptionsParams): Promise<ListSubscriptionsResponse> {
    const response = await this.http.get<ListSubscriptionsResponse>('/v2/sepa/direct_debit_subscriptions', { params });
    return response.data;
  }

  /**
   * Get a specific SEPA Direct Debit subscription.
   * GET /v2/sepa/direct_debit_subscriptions/:id
   */
  async getSubscription(id: string): Promise<SubscriptionResponse> {
    const response = await this.http.get<SubscriptionResponse>(`/v2/sepa/direct_debit_subscriptions/${id}`);
    return response.data;
  }

  /**
   * Create a SEPA Direct Debit subscription.
   * POST /v2/sepa/direct_debit_subscriptions
   */
  async createSubscription(data: CreateSubscriptionParams): Promise<SubscriptionResponse> {
    const response = await this.http.post<SubscriptionResponse>('/v2/sepa/direct_debit_subscriptions', {
      direct_debit_subscription: data
    });
    return response.data;
  }

  /**
   * Cancel a SEPA Direct Debit subscription.
   * POST /v2/sepa/direct_debit_subscriptions/:id/cancel
   */
  async cancelSubscription(id: string): Promise<SubscriptionResponse> {
    const response = await this.http.post<SubscriptionResponse>(`/v2/sepa/direct_debit_subscriptions/${id}/cancel`);
    return response.data;
  }
}
