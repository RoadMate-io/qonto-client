import { AxiosInstance } from 'axios';
import { Organization, UUID } from '../types';

export interface GetOrganizationParams {
  include_external_accounts?: boolean;
}

export interface OrganizationResponse {
  organization: Organization;
}

export class OrganizationsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * DEPRECATED: Retrieve a specific organization by its ID.
   * Please use getCurrent (/v2/organization) instead.
   * GET /v2/organizations/:id
   */
  async show(id: UUID): Promise<OrganizationResponse> {
    const response = await this.http.get<OrganizationResponse>(`/v2/organizations/${id}`);
    return response.data;
  }

  /**
   * Retrieve the current organization associated with the authenticated token.
   * Also lists the bank accounts of the authenticated company.
   * GET /v2/organization
   */
  async getCurrent(params?: GetOrganizationParams): Promise<OrganizationResponse> {
    const response = await this.http.get<OrganizationResponse>('/v2/organization', { params });
    return response.data;
  }
}
