import { Board, GamePhase, GameResult, PlayerMetadata } from '../models/game';

type MessageType = 'join' | 'init' | 'ready' | 'error' | 'board' | 'result' | 'plain' | 'end' | 'debug';

interface GameMessage {
  type: MessageType;
  content: any;
}

export const handleGameMessage = (message: string, 
  setOpponentUuid: (uuid: string | null) => void, 
  setOpponentName: (name: string | null) => void, 
  setOpponentReady: (ready: boolean) => void, 
  opponentUuid: string | null,
  setCurrentPlayer: (playerId: number) => void,
  currentPlayerUuid: string,
  setCountdown: (countdown: number | null) => void,
  setGamePhase: (phase: GamePhase) => void,
  setBoard: (board: Board) => void,
  setGameResult: (gameResult: GameResult) => void,
  ) => {
  try {
    const gameMessage: GameMessage = JSON.parse(message);
    const timestamp = new Date().toISOString();
    
    switch (gameMessage.type) {
      case 'join':
        handleJoinMessage(gameMessage.content, setOpponentUuid, setOpponentName);
        break;
      case 'ready':
        handleReadyMessage(gameMessage.content, setOpponentReady, opponentUuid);
        break;
      case 'init':
        handleInitMessage(gameMessage.content, currentPlayerUuid, setCurrentPlayer, setCountdown);
        break;
      case 'error':
        handleErrorMessage(gameMessage.content);
        break;
      case 'board':
        handleBoardMessage(gameMessage.content, setGamePhase, setBoard);
        break;
      case 'result':
        handleResultMessage(gameMessage.content, setGamePhase, setGameResult);
        break;
      case 'plain':
        handlePlainMessage(gameMessage.content);
        break;
      case 'end':
        handleEndMessage(gameMessage.content);
        break;
      case 'debug':
        handleDebugMessage(gameMessage.content);
        break;
      default:
        console.warn(`[${timestamp}] Unknown message type:`, gameMessage.type);
    }
    
    // Log all messages for now
    // console.log(`[${timestamp}] Received ${gameMessage.type} message:`, gameMessage.content);
    
    return gameMessage;
  } catch (error) {
    console.error('Error parsing message:', error);
    return null;
  }
};

const handleJoinMessage = (content: any, setOpponentUuid: (uuid: string | null) => void, setOpponentName: (name: string | null) => void) => {
  // when the second player joins
  // parse content into PlayerMetadata
  const playerMetadata: PlayerMetadata = JSON.parse(content);

  // set opponent uuid and name
  setOpponentUuid(playerMetadata.player_uuid);
  setOpponentName(playerMetadata.player_name);
};

const handleReadyMessage = (content: any, 
  setOpponentReady: (ready: boolean) => void, 
  opponentUuid: string | null) => {
  // content is just opponent uuid
  if (content === opponentUuid) {
    setOpponentReady(true);
  }
};

// Placeholder handlers for each message type
const handleInitMessage = (content: any, currentPlayerUuid: string, setCurrentPlayer: (playerId: number) => void, setCountdown: (countdown: number | null) => void) => {
  // content is a comma separated strings for two uuids
  const [firstUuid, secondUuid] = content.split(',');

  // if current player uuid is firstUuid, set playerId to 0
  // if current player uuid is secondUuid, set playerId to 1  
  // if current player uuid is not in the list, set playerId to -1
  let playerId = -1;
  if (currentPlayerUuid === firstUuid) {
    playerId = 0;
  } else if (currentPlayerUuid === secondUuid) {
    playerId = 1;
  } else {
    console.error('Current player uuid is not in the list');
  }
  setCurrentPlayer(playerId);
  setCountdown(5);
};

const handleErrorMessage = (content: any) => {
  console.log('Handling error message:', content);
};

const handleBoardMessage = (content: any, 
  setGamePhase: (phase: GamePhase) => void, 
  setBoard: (board: Board) => void, 
  ) => {
  console.log('Handling board message:', content);
  // parse content into Board
  const board: Board = JSON.parse(content);

  // set game phase
  setGamePhase(board.current_phase);

  // set board
  setBoard(board);

};

const handleResultMessage = (content: any, setGamePhase: (phase: GamePhase) => void, setGameResult: (gameResult: GameResult) => void) => {
  console.log('Handling result message:', content);
  // parse content into Result
  const result: GameResult = JSON.parse(content);

  // set game phase
  setGamePhase("game_end");

  // set game result
  setGameResult(result);
};
  

const handlePlainMessage = (content: any) => {
  console.log('Handling plain message:', content);
};

const handleEndMessage = (content: any) => {
  console.log('Handling end message:', content);
};

const handleDebugMessage = (content: any) => {
  console.log('Handling debug message:', content);
}; 