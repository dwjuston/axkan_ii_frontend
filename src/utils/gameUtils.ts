import { Board } from '../models/game';

/**
 * Determines if it's the current player's turn based on the game phase and player roles
 * @param board The current game board
 * @param playerId The current player's ID
 * @returns boolean indicating if it's the player's turn
 */
export const isPlayerTurn = (board: Board | null, playerId: number): boolean => {
  if (!board) return false;
  
  return (
    (board.current_phase === 'turn_select_first' && board.first_selector === playerId) ||
    (board.current_phase === 'turn_select_second' && board.second_selector === playerId)
  );
}; 