import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface StatementFile {
  file_name: string;
  file_content_type: string;
  file_size: string;
  file_url: string;
}

export interface Statement {
  id: UUID;
  bank_account_id: UUID;
  period: string; // e.g. "08-2024"
  file: StatementFile;
}

export interface ListStatementsParams {
  'bank_account_ids[]'?: UUID[];
  'ibans[]'?: string[];
  period_from?: string; // e.g. "01-2023"
  period_to?: string;   // e.g. "12-2023"
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListStatementsResponse {
  statements: Statement[];
  meta: PaginationMeta;
}

export interface StatementResponse {
  statement: Statement;
}

export class StatementsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of statements based on filters.
   * GET /v2/statements
   */
  async list(params?: ListStatementsParams): Promise<ListStatementsResponse> {
    const response = await this.http.get<ListStatementsResponse>('/v2/statements', { params });
    return response.data;
  }

  /**
   * Retrieves a specific statement's details.
   * GET /v2/statements/:id
   */
  async retrieve(id: string): Promise<StatementResponse> {
    const response = await this.http.get<StatementResponse>(`/v2/statements/${id}`);
    return response.data;
  }
}
