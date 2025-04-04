import { API_CONFIG, getApiUrl } from '../config/api';

// API response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// API request options
export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}

/**
 * Generic API request function
 * @param endpoint API endpoint
 * @param options Request options
 * @returns Promise with API response
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params = {}
  } = options;

  try {
    // Build URL with query parameters
    let url = getApiUrl(endpoint);
    if (Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
      url += `?${queryParams.toString()}`;
    }

    // Default headers
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Merge default headers with provided headers
    const mergedHeaders = { ...defaultHeaders, ...headers };

    // Make the request
    const response = await fetch(url, {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse response
    const data = await response.json();

    // Return response
    return {
      data: response.ok ? data : null,
      error: response.ok ? null : data.detail || 'Unknown error',
      status: response.status,
    };
  } catch (error) {
    console.error('API request error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 500,
    };
  }
}

/**
 * Join a game
 * @param playerName Player name
 * @returns Promise with game response
 */
export async function joinGame(playerName: string): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.JOIN_GAME, {
    method: 'POST',
    body: { player_name: playerName },
  });
}

/**
 * Mark player as ready
 * @param gameId Game ID
 * @param playerUuid Player UUID
 * @returns Promise with game response
 */
export async function readyGame(gameId: string, playerUuid: string): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.READY_GAME, {
    method: 'POST',
    params: { game_id: gameId, player_uuid: playerUuid },
  });
}

/**
 * Roll dice
 * @param gameId Game ID
 * @param playerUuid Player UUID
 * @param diceCollectionType Dice collection type
 * @param specialCardIndex Special card index
 * @returns Promise with game response  
 */
export async function rollDice(
  gameId: string,
  playerUuid: string,
  diceCollectionType: string,
  specialCardIndex: number | null
): Promise<ApiResponse<any>> {

  const params: Record<string, string | number | boolean> = {
    game_id: gameId,
    player_uuid: playerUuid,
    dice_collection_type: diceCollectionType,
  };

  if (specialCardIndex !== null) {
    params.special_card_index = specialCardIndex;
  }

  return apiRequest(API_CONFIG.ENDPOINTS.ROLL_DICE, {
      method: 'POST',
      params,
      
    });
}

/**
 * Select a pair
 * @param gameId Game ID
 * @param playerUuid Player UUID
 * @param pairIndex Pair index
 * @returns Promise with game response
 */
export async function selectPair(
  gameId: string,
  playerUuid: string,
  pairIndex: number
): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.SELECT_PAIR, {
    method: 'POST',
    params: {
      game_id: gameId,
      player_uuid: playerUuid,
      pair_index: pairIndex,
    },
  });
}

/**
 * Convert color
 * @param gameId Game ID
 * @param playerUuid Player UUID
 * @param pairIndex Pair index
 * @param specialCardIndex Special card index
 * @returns Promise with game response
 */
export async function convertColor(
  gameId: string,
  playerUuid: string,
  pairIndex: number,
  specialCardIndex: number
): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.CONVERT_COLOR, {
    method: 'POST',
    params: {
      game_id: gameId,
      player_uuid: playerUuid,
      pair_index: pairIndex,
      special_card_index: specialCardIndex,
    },
  });
}

/**
 * End review
 * @param gameId Game ID
 * @param playerUuid Player UUID
 * @returns Promise with game response
 */
export async function endReview(
  gameId: string,
  playerUuid: string
): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.END_REVIEW, {
    method: 'POST',
    params: {
      game_id: gameId,
      player_uuid: playerUuid,
    },
  });
}

/**
 * Get sample board
 * @returns Promise with sample board
 */
export async function getSampleBoard(): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.SAMPLE_BOARD);
}

/**
 * Get sample game result
 * @returns Promise with sample game result
 */
export async function getSampleGameResult(): Promise<ApiResponse<any>> {
  return apiRequest(API_CONFIG.ENDPOINTS.SAMPLE_GAME_RESULT);
} 