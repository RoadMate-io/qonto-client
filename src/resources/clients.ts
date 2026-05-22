import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface ClientPhone {
  country_code: string;
  number: string;
}

export interface ClientAddress {
  street_address?: string;
  city?: string;
  zip_code?: string;
  province_code?: string;
  country_code?: string;
}

export interface Client {
  id: UUID;
  name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  phone?: ClientPhone;
  kind?: 'individual' | 'freelancer' | 'company' | string;
  type?: 'individual' | 'freelancer' | 'company' | string;
  email?: string;
  extra_emails?: string[];
  currency?: string;
  e_invoicing_address?: string;
  e_invoicing_reachable?: boolean;
  vat_number?: string;
  tax_identification_number?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  province_code?: string;
  country_code?: string;
  billing_address?: ClientAddress;
  delivery_address?: ClientAddress;
  recipient_code?: string;
  created_at?: ISODateTime;
  updated_at?: ISODateTime;
  locale?: string;
}

export interface ListClientsParams {
  'filter[]'?: string[];
  'filter[email]'?: string;
  'filter[updated_at_from]'?: string;
  'filter[updated_at_to]'?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListClientsResponse {
  clients: Client[];
  meta: PaginationMeta;
}

export interface ClientResponse {
  client: Client;
}

export interface CreateClientParams {
  first_name?: string;
  last_name?: string;
  kind?: string;
  name?: string;
  type?: string;
  email?: string;
  extra_emails?: string[];
  phone?: ClientPhone;
  e_invoicing_address?: string;
  vat_number?: string;
  tax_identification_number?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  province_code?: string;
  country_code?: string;
  billing_address?: ClientAddress;
  delivery_address?: ClientAddress;
  recipient_code?: string;
  currency?: string;
  locale?: string;
}

export interface UpdateClientParams {
  first_name?: string;
  last_name?: string;
  kind?: string;
  name?: string;
  type?: string;
  email?: string;
  extra_emails?: string[];
  phone?: ClientPhone;
  e_invoicing_address?: string;
  vat_number?: string;
  tax_identification_number?: string;
  address?: string;
  city?: string;
  zip_code?: string;
  province_code?: string;
  country_code?: string;
  billing_address?: ClientAddress;
  delivery_address?: ClientAddress;
  recipient_code?: string;
  currency?: string;
  locale?: string;
}

export class ClientsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of clients.
   */
  async list(params?: ListClientsParams): Promise<ListClientsResponse> {
    const response = await this.http.get('/v2/clients', { params });
    return response.data;
  }

  /**
   * Retrieve a specific client.
   */
  async retrieve(id: string): Promise<ClientResponse> {
    const response = await this.http.get(`/v2/clients/${id}`);
    return response.data;
  }

  /**
   * Create a new client.
   */
  async create(data: CreateClientParams): Promise<ClientResponse> {
    const response = await this.http.post('/v2/clients', data);
    return response.data;
  }

  /**
   * Update a specific client.
   */
  async update(id: string, data: UpdateClientParams): Promise<ClientResponse> {
    const response = await this.http.patch(`/v2/clients/${id}`, data);
    return response.data;
  }

  /**
   * Delete a specific client.
   */
  async remove(id: string): Promise<void> {
    await this.http.delete(`/v2/clients/${id}`);
  }
}
