import React, { useState, useEffect } from 'react';
import { Board } from '../../../models/game';
import CardDisplay from '../../CardDisplay';
import { isPlayerTurn } from '../../../utils/gameUtils';
import { selectPair } from '../../../utils/apiService';

interface MiddlePanelProps {
  board: Board | null;
  playerId: number;
  playerUuid: string;
  gameId: string;
  opponentUuid: string;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ board, playerId, playerUuid, gameId, opponentUuid }) => {
  // if phase is turn_select_first, the player equals first_selector or the phase is turn_select_second and the player equals second_selector
  const isTurn = isPlayerTurn(board, playerId);

  const isTurnComplete = board?.current_phase === 'turn_complete';
  const [selectedPairIndex, setSelectedPairIndex] = useState<number | null>(null);
  const [opponentSelectedPairIndex, setOpponentSelectedPairIndex] = useState<number | null>(null);
  // Update selected pair index when board changes
  useEffect(() => {
    if (board && board.selected_pair_index) {
      // Find the index of the pair selected by the current player
      const playerPairKey = Object.keys(board.selected_pair_index).find(key => 
        key.startsWith(playerUuid)
      );

      const opponentPairKey = Object.keys(board.selected_pair_index).find(key => 
        key.startsWith(opponentUuid)
      );
      
      if (playerPairKey) {
        const index = board.selected_pair_index[playerPairKey];
        setSelectedPairIndex(index);
      } else {
        setSelectedPairIndex(null);
      }
      if (opponentPairKey) {
        const index = board.selected_pair_index[opponentPairKey];
        setOpponentSelectedPairIndex(index);
      } else {
        setOpponentSelectedPairIndex(null);
      }
    }
  }, [board, playerUuid, opponentUuid]);
  
  const handleSelectPair = async (pairIndex: number) => {
    if (!isTurn) return;
    
    try {
      // Mark the pair as selected immediately for better UX
      setSelectedPairIndex(pairIndex);
      
      const response = await selectPair(gameId, playerUuid, pairIndex);
      
      if (response.error) {
        // If the request fails, reset the selected pair
        setSelectedPairIndex(null);
        console.error('Error selecting pair:', response.error);
        return;
      }
      
      console.log('Pair selected successfully:', response.data);
    } catch (error) {
      console.error('Error selecting pair:', error);
      setSelectedPairIndex(null);
    }
  };
  
  // Check if a pair is already selected in the board
  const isPairSelected = (index: number): boolean => {
    if (!board) return false;
    
    // Check if this pair is in the selected_pair_index
    const pairKey = `${playerUuid}_${index}`;
    return board.selected_pair_index && board.selected_pair_index[pairKey] !== undefined;
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: '1vmin',
      padding: '2vmin',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      gap: '2vmin'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '2vmin',
        height: '100%'
      }}>
        {board?.available_pairs.slice(0, 3).map((pair, index) => {
          // Check if this pair is selected by the current player or the opponent
          const isSelectedByPlayer = selectedPairIndex === index || isPairSelected(index);
          const isSelectedByOpponent = opponentSelectedPairIndex === index;
          const isSelected = isSelectedByPlayer || isSelectedByOpponent;
          
          // Determine the border color based on who selected the pair
          const borderColor = isSelectedByPlayer ? '#4CAF50' : isSelectedByOpponent ? '#FF9800' : 'none';
          
          // Disable button if it's not the player's turn, the pair is already selected, or the game phase is turn_complete
          const isDisabled = !isTurn || isSelectedByPlayer || isSelectedByOpponent || isTurnComplete;
          return (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1vmin',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                border: isSelected ? `2px solid ${borderColor}` : 'none',
                borderRadius: '0.5vmin',
                padding: isSelected ? '0.5vmin' : '0',
                transition: 'all 0.2s ease'
              }}>
                <CardDisplay cardPair={pair} size="medium" />
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '-0.5vmin',
                    right: '-0.5vmin',
                    backgroundColor: borderColor,
                    color: 'white',
                    borderRadius: '50%',
                    width: '2vmin',
                    height: '2vmin',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.2vmin'
                  }}>
                    ✓
                  </div>
                )}
              </div>
              <button
                style={{
                  padding: '0.5vmin 2vmin',
                  backgroundColor: isSelectedByPlayer ? '#4CAF50' : '#4CAF50',
                  color: '#333333',
                  border: 'none',
                  borderRadius: '0.5vmin',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.5 : 1
                }}
                disabled={isDisabled}
                onClick={() => handleSelectPair(index)}
              >
                {isSelectedByPlayer ? 'You' : isSelectedByOpponent ? 'Opponent' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiddlePanel; 