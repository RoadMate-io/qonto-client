import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface SepaBeneficiary {
  id: UUID;
  name: string;
  iban: string;
  bic: string;
  status: 'pending' | 'validated' | 'declined' | string;
  trusted: boolean;
  created_at: ISODateTime;
  updated_at: ISODateTime;
  email?: string | null;
  activity_tag?: string | null;
}

export interface ListBeneficiariesParams {
  iban?: string | string[];
  status?: string | string[];
  trusted?: boolean;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListBeneficiariesResponse {
  beneficiaries: SepaBeneficiary[];
  meta: PaginationMeta;
}

export interface BeneficiaryResponse {
  beneficiary: SepaBeneficiary;
}

export interface CreateBeneficiaryParams {
  beneficiary: {
    name: string;
    iban: string;
    bic?: string;
    email?: string;
    activity_tag?: string;
  };
}

export interface UpdateBeneficiaryParams {
  beneficiary: {
    name?: string;
    email?: string;
    activity_tag?: string;
  };
}

export interface TrustBeneficiariesParams {
  ids: UUID[];
}

export interface TrustBeneficiariesResponse {
  beneficiaries: SepaBeneficiary[];
}

export class BeneficiariesResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Return the list of SEPA beneficiaries for the authenticated organization.
   */
  async list(params?: ListBeneficiariesParams): Promise<ListBeneficiariesResponse> {
    const response = await this.http.get('/v2/sepa/beneficiaries', { params });
    return response.data;
  }

  /**
   * Adds a new untrusted SEPA beneficiary to the organization's main bank account.
   */
  async create(data: CreateBeneficiaryParams): Promise<BeneficiaryResponse> {
    const response = await this.http.post('/v2/sepa/beneficiaries', data);
    return response.data;
  }

  /**
   * Removes a given SEPA beneficiary by ID.
   */
  async remove(id: string): Promise<void> {
    await this.http.delete(`/v2/sepa/beneficiaries/${id}`);
  }

  /**
   * Returns a given SEPA beneficiary by ID.
   */
  async retrieve(id: string): Promise<BeneficiaryResponse> {
    const response = await this.http.get(`/v2/sepa/beneficiaries/${id}`);
    return response.data;
  }

  /**
   * Allows updating a SEPA beneficiary's name, email and activity_tag.
   */
  async update(id: string, data: UpdateBeneficiaryParams): Promise<BeneficiaryResponse> {
    const response = await this.http.put(`/v2/sepa/beneficiaries/${id}`, data);
    return response.data;
  }

  /**
   * Trust up to 400 SEPA beneficiaries at once.
   */
  async trust(data: TrustBeneficiariesParams): Promise<TrustBeneficiariesResponse> {
    const response = await this.http.put('/v2/sepa/beneficiaries/trust', data);
    return response.data;
  }

  /**
   * Untrust up to 400 SEPA beneficiaries at once.
   */
  async untrust(data: TrustBeneficiariesParams): Promise<TrustBeneficiariesResponse> {
    const response = await this.http.put('/v2/sepa/beneficiaries/untrust', data);
    return response.data;
  }
}
