import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface ProductAmount {
  currency: string;
  value: string;
}

export interface ProductLink {
  title: string;
  url: string;
}

export interface Product {
  id: UUID;
  title: string;
  type: string;
  unit_price: ProductAmount;
  vat_rate: string;
  organization_id: UUID;
  created_at: string;
  updated_at: string;
  description?: string;
  internal_note?: string;
  unit?: string;
  vat_exemption_code?: string;
  links?: ProductLink[];
}

export interface ListProductsParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
}

export interface ListProductsResponse {
  products: Product[];
  meta: PaginationMeta;
}

export interface ProductResponse {
  product: Product;
}

export interface CreateProductParams {
  title: string;
  type: string;
  unit_price: ProductAmount;
  vat_rate: string;
  description?: string;
  internal_note?: string;
  unit?: string;
  vat_exemption_code?: string;
  links?: ProductLink[];
}

export class ProductsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of products.
   * GET /v2/products
   */
  async list(params?: ListProductsParams): Promise<ListProductsResponse> {
    const response = await this.http.get<ListProductsResponse>('/v2/products', { params });
    return response.data;
  }

  /**
   * Retrieves a specific product.
   * GET /v2/products/:id
   */
  async retrieve(id: string): Promise<ProductResponse> {
    const response = await this.http.get<ProductResponse>(`/v2/products/${id}`);
    return response.data;
  }

  /**
   * Creates a new product.
   * POST /v2/products
   */
  async create(data: CreateProductParams): Promise<ProductResponse> {
    const response = await this.http.post<ProductResponse>('/v2/products', data);
    return response.data;
  }

  /**
   * Deletes a specific product.
   * DELETE /v2/products/:id
   */
  async delete(id: string): Promise<void> {
    await this.http.delete(`/v2/products/${id}`);
  }
}
