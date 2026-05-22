import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface CreditNote {
  id: UUID;
  organization_id?: UUID;
  client_invoice_id?: UUID;
  number?: string;
  issue_date?: string;
  created_at: ISODateTime;
  updated_at?: ISODateTime;
  currency: string;
  total_amount?: string;
  total_amount_cents?: number;
  vat_amount?: string;
  vat_amount_cents?: number;
  client?: any;
  items?: any[];
  [key: string]: any;
}

export interface ListCreditNotesParams {
  'filter[created_at_from]'?: string;
  'filter[created_at_to]'?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListCreditNotesResponse {
  credit_notes: CreditNote[];
  meta: PaginationMeta;
}

export interface CreditNoteResponse {
  credit_note: CreditNote;
}

export interface CreateCreditNoteParams {
  credit_note: Partial<CreditNote>;
}

export class CreditNotesResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of credit notes.
   */
  async list(params?: ListCreditNotesParams): Promise<ListCreditNotesResponse> {
    const response = await this.http.get('/v2/credit_notes', { params });
    return response.data;
  }

  /**
   * Retrieve a specific credit note.
   */
  async retrieve(id: string): Promise<CreditNoteResponse> {
    const response = await this.http.get(`/v2/credit_notes/${id}`);
    return response.data;
  }

  /**
   * Create a new credit note.
   */
  async create(data: CreateCreditNoteParams): Promise<CreditNoteResponse> {
    const response = await this.http.post('/v2/credit_notes', data);
    return response.data;
  }
}
