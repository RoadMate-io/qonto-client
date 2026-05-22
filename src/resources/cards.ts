import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta, ISODateTime } from '../types';

export interface CardAddress {
  contact_name?: string | null;
  first_line?: string;
  second_line?: string;
  third_line?: string;
  zipcode?: string;
  city?: string;
  country?: string;
}

export interface CardAppearance {
  assets: {
    front_large: string;
    front_small: string;
    front_small_wallet: string;
  };
  theme: string;
  gradient_hex_color: string;
}

export interface Card {
  id: UUID;
  nickname: string;
  embossed_name: string;
  status: string;
  pin_set?: boolean;
  mask_pan?: string;
  exp_month?: string;
  exp_year?: string;
  last_activity_at?: ISODateTime;
  last_digits?: string;
  ship_to_business?: boolean;
  atm_option?: boolean;
  nfc_option?: boolean;
  online_option?: boolean;
  foreign_option?: boolean;
  atm_monthly_limit?: number;
  atm_monthly_spent?: number;
  atm_daily_limit?: number;
  atm_daily_spent?: number;
  atm_daily_limit_option?: boolean;
  payment_monthly_limit?: number;
  payment_monthly_spent?: number;
  payment_daily_limit?: number;
  payment_daily_spent?: number;
  payment_daily_limit_option?: boolean;
  payment_transaction_limit?: number;
  payment_transaction_limit_option?: boolean;
  active_days?: number[];
  holder_id?: UUID;
  initiator_id?: UUID;
  bank_account_id?: UUID;
  organization_id?: UUID;
  updated_at?: ISODateTime;
  created_at?: ISODateTime;
  shipped_at?: ISODateTime | null;
  card_type?: string;
  card_level?: string;
  payment_lifespan_limit?: number;
  payment_lifespan_spent?: number;
  pre_expires_at?: ISODateTime | null;
  categories?: string[];
  renewed?: boolean;
  renewal?: boolean;
  parent_card_summary?: {
    id: UUID;
    last_digits: string;
  };
  had_operation?: boolean;
  had_pin_operation?: boolean;
  card_design?: string;
  type_of_print?: string;
  upsold?: boolean;
  upsell?: boolean;
  discard_on?: string;
  reordered?: boolean;
  appearance?: CardAppearance;
  has_only_user_liftable_locks?: boolean;
}

export interface ListCardsParams {
  query?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  holder_ids?: UUID[];
  statuses?: string[];
  bank_account_ids?: UUID[];
  card_levels?: string[];
  ids?: UUID[];
}

export interface ListCardsResponse {
  cards: Card[];
  meta: PaginationMeta;
}

export interface CardResponse {
  card: Card;
}

export interface CreateCardParams {
  card: Partial<Card> & { address?: CardAddress };
}

export interface BulkCreateCardsParams {
  cards: CreateCardParams['card'][];
}

export class CardsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of all cards.
   */
  async list(params?: ListCardsParams): Promise<ListCardsResponse> {
    const response = await this.http.get('/v2/cards', { params });
    return response.data;
  }

  /**
   * Retrieves a specific card.
   */
  async retrieve(id: string): Promise<CardResponse> {
    // Based on standard conventions, though wasn't fully listed in abbreviated Postman 
    const response = await this.http.get(`/v2/cards/${id}`);
    return response.data;
  }

  /**
   * Create a new card.
   */
  async create(data: CreateCardParams): Promise<CardResponse> {
    const response = await this.http.post('/v2/cards', data);
    return response.data;
  }

  /**
   * Bulk create cards
   */
  async createBulk(data: BulkCreateCardsParams): Promise<any> {
    const response = await this.http.post('/v2/cards/bulk', data);
    return response.data;
  }

  // --- CARD UPDATE METHODS ---

  async updateLimits(id: string, data: { card: { atm_monthly_limit?: number; atm_daily_limit_option?: boolean; atm_daily_limit?: number; payment_monthly_limit?: number; payment_daily_limit_option?: boolean; payment_daily_limit?: number; payment_transaction_limit_option?: boolean; payment_transaction_limit?: number; } }): Promise<CardResponse> {
    const response = await this.http.patch(`/v2/cards/${id}/limits`, data);
    return response.data;
  }

  async updateRestrictions(id: string, data: { card: { active_days?: number[]; categories?: string[]; } }): Promise<CardResponse> {
    const response = await this.http.patch(`/v2/cards/${id}/restrictions`, data);
    return response.data;
  }

  async updateOptions(id: string, data: { card: { atm_option?: boolean; nfc_option?: boolean; online_option?: boolean; foreign_option?: boolean; } }): Promise<CardResponse> {
    const response = await this.http.patch(`/v2/cards/${id}/options`, data);
    return response.data;
  }

  async updateNickname(id: string, data: { card: { nickname: string; } }): Promise<CardResponse> {
    const response = await this.http.patch(`/v2/cards/${id}/nickname`, data);
    return response.data;
  }

  // Kept for backward compatibility if needed, aliased to limits
  async update(id: string, data: { card: { atm_monthly_limit?: number; atm_daily_limit_option?: boolean; atm_daily_limit?: number; payment_monthly_limit?: number; payment_daily_limit_option?: boolean; payment_daily_limit?: number; payment_transaction_limit_option?: boolean; payment_transaction_limit?: number; } }): Promise<CardResponse> {
    return this.updateLimits(id, data);
  }

  // --- LIFECYCLE METHODS ---

  async lock(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/lock`);
    return response.data;
  }
  
  async block(id: string): Promise<CardResponse> {
    return this.lock(id);
  }

  async unlock(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/unlock`);
    return response.data;
  }
  
  async unblock(id: string): Promise<CardResponse> {
    return this.unlock(id);
  }

  async discard(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/discard`);
    return response.data;
  }
  
  async cancel(id: string): Promise<CardResponse> {
    return this.discard(id);
  }

  async renew(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/renew`);
    return response.data;
  }

  async reportLost(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/lost`);
    return response.data;
  }

  async reportStolen(id: string): Promise<CardResponse> {
    const response = await this.http.put(`/v2/cards/${id}/stolen`);
    return response.data;
  }

  // --- PIN / SECURE METHODS ---
  // Assuming void payloads or empty config, typed as Record<string, never> or standard CardResponse

  async getSensitiveData(id: string): Promise<{ iframe_url: string }> {
    const response = await this.http.get(`/v2/cards/${id}/data_view`);
    return response.data;
  }

  async updatePin(id: string): Promise<void> {
    const response = await this.http.post(`/v2/cards/${id}/pin`);
    return response.data;
  }

  async blockPin(id: string): Promise<void> {
    const response = await this.http.put(`/v2/cards/${id}/pin/block`);
    return response.data;
  }

  async unblockPin(id: string): Promise<void> {
    const response = await this.http.put(`/v2/cards/${id}/pin/unblock`);
    return response.data;
  }

  async checkPin(id: string): Promise<void> {
    const response = await this.http.post(`/v2/cards/${id}/pin/check`);
    return response.data;
  }

  async getPin(id: string): Promise<void> {
    const response = await this.http.get(`/v2/cards/${id}/pin`);
    return response.data;
  }
}
