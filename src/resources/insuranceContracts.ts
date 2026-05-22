import { AxiosInstance } from 'axios';
import { UUID, Money } from '../types';

export interface InsuranceContractDocument {
  id: UUID;
  name: string;
  type: string;
}

export interface InsuranceContract {
  id: UUID;
  name: string;
  contract_id?: string;
  origin?: string;
  provider_slug?: string;
  type?: string;
  status: string;
  troubleshooting_url?: string;
  service_url?: string;
  expiration_date?: string;
  start_date?: string;
  renewal_date?: string;
  payment_frequency?: string;
  price?: {
    value: string;
    currency: string;
  };
  documents?: InsuranceContractDocument[];
}

export interface InsuranceContractResponse {
  insurance_contract: InsuranceContract;
}

export interface CreateInsuranceContractParams {
  insurance_contract: Partial<InsuranceContract>;
}

export interface UpdateInsuranceContractParams {
  insurance_contract: Partial<InsuranceContract>;
}

export class InsuranceContractsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of insurance contracts.
   */
  async list(params?: any): Promise<any> {
    const response = await this.http.get('/v2/insurance_contracts', { params });
    return response.data;
  }

  /**
   * Retrieve a specific insurance contract.
   */
  async retrieve(id: string): Promise<InsuranceContractResponse> {
    const response = await this.http.get(`/v2/insurance_contracts/${id}`);
    return response.data;
  }

  /**
   * Create a new insurance contract.
   */
  async create(data: CreateInsuranceContractParams): Promise<InsuranceContractResponse> {
    const response = await this.http.post('/v2/insurance_contracts', data);
    return response.data;
  }

  /**
   * Update an insurance contract.
   */
  async update(id: string, data: UpdateInsuranceContractParams): Promise<InsuranceContractResponse> {
    const response = await this.http.patch(`/v2/insurance_contracts/${id}`, data);
    return response.data;
  }

  /**
   * Cancel an insurance contract.
   */
  async cancel(id: string, params?: any): Promise<any> {
    const response = await this.http.delete(`/v2/insurance_contracts/${id}`, { params });
    return response.data;
  }

  /**
   * Upload a document to an insurance contract.
   * 
   * Provides a wrapper to easily upload without building the FormData manually if desired.
   */
  async uploadDocument(id: string, data: { file: any; name: string; type: string }): Promise<InsuranceContractDocument> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('type', data.type);

    const response = await this.http.post(`/v2/insurance_contracts/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  /**
   * Remove a document from an insurance contract
   */
  async removeDocument(id: string, attachmentId: string): Promise<void> {
    await this.http.delete(`/v2/insurance_contracts/${id}/attachments/${attachmentId}`);
  }
}
