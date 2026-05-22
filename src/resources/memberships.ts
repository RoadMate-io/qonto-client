import { AxiosInstance } from 'axios';
import { Membership, PaginationMeta, ListMembershipsParams, CreateMembershipBody } from '../types';

export class MembershipsResource {
  constructor(private readonly http: AxiosInstance) {}

  /** GET /v2/memberships */
  async list(params?: ListMembershipsParams): Promise<{ memberships: Membership[]; meta: PaginationMeta }> {
    const response = await this.http.get('/v2/memberships', { params });
    return response.data;
  }

  /** GET /v2/membership */
  async getCurrent(): Promise<{ membership: Membership }> {
    const response = await this.http.get('/v2/membership');
    return response.data;
  }

  /** POST /v2/memberships/invite_employee_or_accountant */
  async create(body: CreateMembershipBody): Promise<{ membership: Membership }> {
    const response = await this.http.post('/v2/memberships/invite_employee_or_accountant', body);
    return response.data;
  }
}