import { AxiosInstance } from 'axios';
import { UUID, ISODateTime } from '../types';

export interface InternalTransfer {
  id: UUID;
  slug: string;
  status: 'pending' | 'completed' | 'declined' | string;
  amount: string;
  amount_cents: number | string;
  currency: string;
  reference?: string;
  created_at: ISODateTime;
}

export interface CreateInternalTransferParams {
  internal_transfer: {
    debit_iban: string;
    credit_iban: string;
    amount: string | number;
    currency: string;
    reference?: string;
  };
}

export interface InternalTransferResponse {
  internal_transfer: InternalTransfer;
}

export class InternalTransfersResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Create an internal transfer between accounts of the same organization.
   */
  async create(data: CreateInternalTransferParams): Promise<InternalTransferResponse> {
    const response = await this.http.post('/v2/internal_transfers', data);
    return response.data;
  }
}
