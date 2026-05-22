import { AxiosInstance } from 'axios';
import { UUID, PaginationMeta } from '../types';

export interface Team {
  id: UUID;
  name: string;
}

export interface ListTeamsParams {
  page?: number;
  per_page?: number;
}

export interface ListTeamsResponse {
  teams: Team[];
  meta: PaginationMeta;
}

export interface TeamResponse {
  team: Team;
}

export interface CreateTeamParams {
  name: string;
}

export class TeamsResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Retrieves a list of teams.
   * GET /v2/teams
   */
  async list(params?: ListTeamsParams): Promise<ListTeamsResponse> {
    const response = await this.http.get<ListTeamsResponse>('/v2/teams', { params });
    return response.data;
  }

  /**
   * Creates a new team.
   * POST /v2/teams
   */
  async create(data: CreateTeamParams): Promise<TeamResponse> {
    const response = await this.http.post<TeamResponse>('/v2/teams', data);
    return response.data;
  }
}
