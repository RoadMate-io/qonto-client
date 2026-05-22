import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface SepaTransferItem {
  id?: UUID;
  amount: string;
  client_transfer_id?: string;
  reference?: string;
  beneficiary_id?: UUID;
  beneficiary?: {
    name: string;
    iban: string;
    bic?: string;
    email?: string;
    activity_tag?: string;
  } | null;
  scheduled_date?: string;
  note?: string;
  attachment_ids?: UUID[];
}

export interface SepaTransfer {
  beneficiary_id?: UUID;
  bank_account_id: UUID;
  reference: string;
  amount: string;
  note?: string;
  attachment_ids?: UUID[];
  scheduled_date?: string;
  beneficiary?: {
    name: string;
    iban: string;
    bic?: string;
    email?: string;
    activity_tag?: string;
  } | null;
}

export interface CreateSepaTransferParams {
  vop_proof_token?: string;
  transfer: SepaTransfer;
}

export interface CreateBulkSepaTransfersParams {
  bank_account_id: UUID;
  bulk_transfers: SepaTransferItem[];
  vop_proof_token?: string;
}

export interface ListSepaTransfersParams {
  page?: number;
  per_page?: number;
}

export class SepaTransfersResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * List SEPA bulk transfers.
   * GET /v2/sepa/bulk_transfers
   */
  async listBulk(params?: ListSepaTransfersParams): Promise<any> {
    const response = await this.http.get('/v2/sepa/bulk_transfers', { params });
    return response.data;
  }

  /**
   * Get a specific SEPA bulk transfer by ID.
   * GET /v2/sepa/bulk_transfers/:id
   */
  async getBulk(id: string): Promise<any> {
    const response = await this.http.get(`/v2/sepa/bulk_transfers/${id}`);
    return response.data;
  }

  /**
   * Create a batch of SEPA transfers.
   * POST /v2/sepa/bulk_transfers
   */
  async createBulk(data: CreateBulkSepaTransfersParams): Promise<any> {
    const response = await this.http.post('/v2/sepa/bulk_transfers', data);
    return response.data;
  }

  /**
   * Creates a new SEPA transfer.
   * POST /v2/sepa/transfers
   */
  async create(data: CreateSepaTransferParams): Promise<any> {
    const response = await this.http.post('/v2/sepa/transfers', data);
    return response.data;
  }

  /**
   * Retrieves a specific transfer details.
   * GET /v2/sepa/transfers/:id
   */
  async retrieve(id: string): Promise<any> {
    const response = await this.http.get(`/v2/sepa/transfers/${id}`);
    return response.data;
  }

  /**
   * Cancel an existing SEPA Transfer.
   * POST /v2/sepa/transfers/:id/cancel
   */
  async cancel(id: string): Promise<any> {
    const response = await this.http.post(`/v2/sepa/transfers/${id}/cancel`);
    return response.data;
  }
}
