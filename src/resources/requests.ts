import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

// Depending on the type of request, the structure varies.
export interface RequestModel {
  id: UUID;
  status: string;
  request_type: string;
  created_at: string;
  processed_at?: string;
  [key: string]: any;
}

export interface ListRequestsParams {
  'status[]'?: string[];
  'request_type[]'?: string[];
  created_at_from?: string;
  processed_at_from?: string;
  sort_by?: string;
  page?: number;
  per_page?: number;
}

export interface ListRequestsResponse {
  requests: RequestModel[];
  meta: PaginationMeta;
}

export interface RequestFlashCardParams {
  note?: string;
  payment_lifespan_limit: string | number;
  pre_expires_at?: string;
}

export interface RequestVirtualCardParams {
  note?: string;
  payment_monthly_limit: string | number;
  card_level: string;
  card_design?: string;
}

export interface MultiTransferItem {
  amount: string;
  currency: string;
  credit_iban: string;
  credit_account_name: string;
  credit_account_currency?: string;
  reference?: string;
  attachment_ids?: string[];
}

export interface RequestMultiTransferParams {
  note?: string;
  transfers: MultiTransferItem[];
  scheduled_date?: string;
  debit_iban?: string;
}

export class RequestsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of requests based on the given filters.
   * GET /v2/requests
   */
  async list(params?: ListRequestsParams): Promise<ListRequestsResponse> {
    const response = await this.http.get<ListRequestsResponse>('/v2/requests', { params });
    return response.data;
  }

  /**
   * Create a single flash card request.
   * POST /v2/requests/flash_cards
   */
  async createFlashCardRequest(data: RequestFlashCardParams): Promise<{ request: RequestModel }> {
    const response = await this.http.post<{ request: RequestModel }>('/v2/requests/flash_cards', {
      request_flash_card: data
    });
    return response.data;
  }

  /**
   * Create a single virtual card request.
   * POST /v2/requests/virtual_cards
   */
  async createVirtualCardRequest(data: RequestVirtualCardParams): Promise<{ request: RequestModel }> {
    const response = await this.http.post<{ request: RequestModel }>('/v2/requests/virtual_cards', {
      request_virtual_card: data
    });
    return response.data;
  }

  /**
   * Create a multi-transfer request.
   * POST /v2/requests/multi_transfers
   */
  async createMultiTransferRequest(data: RequestMultiTransferParams): Promise<{ request: RequestModel }> {
    const response = await this.http.post<{ request: RequestModel }>('/v2/requests/multi_transfers', {
      request_multi_transfer: data
    });
    return response.data;
  }

  /**
   * Approve a request.
   * POST /v2/requests/:request_type/:id/approve
   */
  async approve(requestType: string, id: string): Promise<{ request: RequestModel }> {
    const response = await this.http.post<{ request: RequestModel }>(`/v2/requests/${requestType}/${id}/approve`);
    return response.data;
  }

  /**
   * Decline a request.
   * POST /v2/requests/:request_type/:id/decline
   */
  async decline(requestType: string, id: string): Promise<{ request: RequestModel }> {
    const response = await this.http.post<{ request: RequestModel }>(`/v2/requests/${requestType}/${id}/decline`);
    return response.data;
  }
}
