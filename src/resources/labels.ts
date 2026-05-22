import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface Label {
  id: UUID;
  name: string;
  parent_id: UUID | null;
}

export interface ListLabelsParams {
  page?: number;
  per_page?: number;
}

export interface ListLabelsResponse {
  labels: Label[];
  meta: PaginationMeta;
}

export interface LabelResponse {
  label: Label;
}

export interface CreateLabelParams {
  name: string;
  parent_id?: UUID;
}

export class LabelsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of all labels in your organization.
   */
  async list(params?: ListLabelsParams): Promise<ListLabelsResponse> {
    const response = await this.http.get('/v2/labels', { params });
    return response.data;
  }

  /**
   * Retrieves a specific label.
   */
  async retrieve(id: string): Promise<LabelResponse> {
    const response = await this.http.get(`/v2/labels/${id}`);
    return response.data;
  }

  /**
   * Creates a new label. 
   * (Method mapping kept per standard operations)
   */
  async create(data: CreateLabelParams): Promise<LabelResponse> {
    const response = await this.http.post('/v2/labels', data);
    return response.data;
  }
}
