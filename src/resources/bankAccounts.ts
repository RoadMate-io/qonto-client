import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface BankAccount {
  id: UUID;
  name: string;
  organization_id: UUID;
  status: 'active' | 'closed' | string;
  main: boolean;
  iban?: string;
  bic?: string;
  currency: string;
  balance?: string;
  balance_cents?: number;
  authorized_balance?: string;
  authorized_balance_cents?: number;
  updated_at: ISODateTime;
  is_external_account: boolean;
  account_number?: string;
}

export interface ListBankAccountsParams {
  /** Page number to fetch (starts at 1) */
  page?: number;
  /** Number of items per page (default 10) */
  per_page?: number;
}

export interface BankAccountResponse {
  bank_account: BankAccount;
}

export interface ListBankAccountsResponse {
  bank_accounts: BankAccount[];
  meta: PaginationMeta;
}

export interface CreateBankAccountParams {
  bank_account: {
    name: string;
  };
}

export interface UpdateBankAccountParams {
  bank_account: {
    name: string;
  };
}

export class BankAccountsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of all business accounts.
   */
  async list(params?: ListBankAccountsParams): Promise<ListBankAccountsResponse> {
    const response = await this.http.get('/v2/bank_accounts', { params });
    return response.data;
  }

  /**
   * Retrieves detailed information about a specific business account identified by its ID.
   */
  async retrieve(id: string): Promise<BankAccountResponse> {
    const response = await this.http.get(`/v2/bank_accounts/${id}`);
    return response.data;
  }

  /**
   * Creates a new business account.
   */
  async create(data: CreateBankAccountParams): Promise<BankAccountResponse> {
    const response = await this.http.post('/v2/bank_accounts', data);
    return response.data;
  }

  /**
   * Updates the details of a specific business account identified by its ID. Currently, it supports only updating the account name.
   */
  async update(id: string, data: UpdateBankAccountParams): Promise<BankAccountResponse> {
    const response = await this.http.put(`/v2/bank_accounts/${id}`, data);
    return response.data;
  }

  /**
   * Closes a specific business account identified by its ID.
   */
  async close(id: string): Promise<void> {
    await this.http.post(`/v2/bank_accounts/${id}/close`, {});
  }

  /**
   * Downloads the IBAN certificate for a specific business account identified by its ID.
   */
  async downloadIbanCertificate(id: string, locale: string = 'en'): Promise<any> {
    const response = await this.http.get(`/v2/bank_accounts/${id}/iban_certificate`, { params: { locale } });
    return response.data;
  }
}
