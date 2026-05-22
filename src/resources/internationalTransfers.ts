import { AxiosInstance } from 'axios';
import { UUID, Money, ISODateTime } from '../types';

export interface InternationalTransfer {
  id: UUID;
  beneficiary_id: UUID;
  bank_account_id: UUID;
  source_amount: {
    currency: string;
    value: string;
  };
  target_amount: {
    currency: string;
    value: string;
  };
  status: string;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
}

export interface Quote {
  id: UUID;
  status: string;
  created_at: ISODateTime;
  expired_at: ISODateTime;
  source_amount: {
    currency: string;
    value: string;
  };
  target_amount: {
    currency: string;
    value: string;
  };
  rate: number;
  fees: {
    total_amount: {
      currency: string;
      value: string;
    };
    details: {
      currency: string;
      value: string;
    }[];
  };
}

export interface Currency {
  currency_code: string;
  country_code: string;
  suggestion_priority: number;
}

export interface CreateInternationalTransferParams {
  beneficiary_id: UUID;
  quote_id?: UUID;
  details?: {
    reference?: string;
  };
  target_account_id?: string;
  source_amount?: {
    currency: string;
    value: string;
  };
  target_amount?: {
    currency: string;
    value: string;
  };
  bank_account_id: UUID;
  attachment_ids?: UUID[];
}

export interface CreateQuoteParams {
  source_currency: string;
  target_currency: string;
  source_amount?: string;
  target_amount?: string;
}

export class InternationalTransfersResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * List international transfers
   */
  async list(params?: any): Promise<{ transfers: InternationalTransfer[] }> {
    const response = await this.http.get('/v2/international/transfers', { params });
    return response.data;
  }

  /**
   * Retrieve a specific international transfer
   */
  async retrieve(id: string): Promise<{ transfer: InternationalTransfer }> {
    const response = await this.http.get(`/v2/international/transfers/${id}`);
    return response.data;
  }

  /**
   * Create an international transfer
   */
  async create(data: CreateInternationalTransferParams): Promise<{ transfer: InternationalTransfer }> {
    const response = await this.http.post('/v2/international/transfers', data);
    return response.data;
  }

  /**
   * Cancel an international transfer
   */
  async cancel(id: string): Promise<any> {
    const response = await this.http.post(`/v2/international/transfers/${id}/cancel`); // Typically cancellation is POST on Qonto API
    return response.data;
  }

  /**
   * Get available currencies for international transfers
   */
  async listCurrencies(params?: { source?: string }): Promise<{ currencies: Currency[] }> {
    const response = await this.http.get('/v2/international/currencies', { params });
    return response.data;
  }

  /**
   * Create a new international transfer quote
   */
  async createQuote(data: CreateQuoteParams): Promise<{ quote: Quote }> {
    const response = await this.http.post('/v2/international/quotes', data);
    return response.data;
  }

  /**
   * Retrieve a quote (renamed from getQuote to map original class)
   */
  async getQuote(id: string, params?: any): Promise<{ quote: Quote }> {
    const response = await this.http.get(`/v2/international/quotes/${id}`, { params });
    return response.data;
  }

  /**
   * Retrieve the details/purpose codes for a specific country/currency.
   */
  async getPurposeCodes(id: string, params?: any): Promise<any> {
    const response = await this.http.get(`/v2/international/purpose_codes/${id}`, { params });
    return response.data;
  }

  /**
   * Retrieve details
   */
  async retrieveDetails(params?: any): Promise<any> {
    const response = await this.http.get('/v2/international/details', { params });
    return response.data;
  }
}
