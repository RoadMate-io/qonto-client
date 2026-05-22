import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CardsResource, CreateCardParams } from '../../src/resources/cards';

describe('CardsResource', () => {
  let mockAxios: MockAdapter;
  let resource: CardsResource;

  beforeEach(() => {
    const axiosInstance = axios.create();
    mockAxios = new MockAdapter(axiosInstance);
    resource = new CardsResource(axiosInstance);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should list cards', async () => {
    const mockData = { cards: [{ id: 'card_123' }] };
    mockAxios.onGet('/v2/cards').reply(200, mockData);
    const result = await resource.list();
    expect(result).toEqual(mockData);
  });

  it('should retrieve a card', async () => {
    const mockData = { card: { id: 'card_123' } };
    mockAxios.onGet('/v2/cards/card_123').reply(200, mockData);
    const result = await resource.retrieve('card_123');
    expect(result).toEqual(mockData);
  });

  it('should create a card', async () => {
    const payload: CreateCardParams = { card: { card_type: 'physical' } };
    const mockData = { card: { id: 'card_123', ...payload.card } };
    mockAxios.onPost('/v2/cards').reply(201, mockData);
    const result = await resource.create(payload);
    expect(result).toEqual(mockData);
  });
});
