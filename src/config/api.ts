// API Configuration
export const API_CONFIG = {
  // Base URL for API endpoints
  BASE_URL: 'https://axkaniibacken-production.up.railway.app',
  //BASE_URL: 'http://127.0.0.1:8000',
  
  // API version
  API_VERSION: 'v1',
  
  // load API_KEY from environment variable or use default
  API_KEY: typeof process !== 'undefined' && process.env && process.env.API_KEY_INTERNAL 
    ? process.env.API_KEY_INTERNAL 
    : '1', // Default fallback value
  
  // API endpoints
  ENDPOINTS: {
    // Game endpoints
    CLEAR_GAME: '/api/v1/games/clear',
    JOIN_GAME: '/api/v1/games/join',
    READY_GAME: '/api/v1/games/ready',
    ROLL_DICE: '/api/v1/games/roll-dice',
    SELECT_PAIR: '/api/v1/games/select-pair',
    CONVERT_COLOR: '/api/v1/games/convert-color',
    END_REVIEW: '/api/v1/games/end-review',
    
    // Sample data endpoints
    SAMPLE_BOARD: '/api/v1/games/sample/board',
    SAMPLE_GAME_RESULT: '/api/v1/games/sample/game-result',
  },
  
  // WebSocket endpoint
  WS_ENDPOINT: 'ws://axkaniibacken-production.up.railway.app/api/v1/games/ws',
  //WS_ENDPOINT: 'ws://127.0.0.1:8000/api/v1/games/ws',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get WebSocket URL
export const getWsUrl = (): string => {
  return API_CONFIG.WS_ENDPOINT;
}; 