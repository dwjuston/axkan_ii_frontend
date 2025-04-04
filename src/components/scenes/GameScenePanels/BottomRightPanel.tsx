import React from 'react';
import { Board, DiceCollectionType } from '../../../models/game';

interface BottomRightPanelProps {
  board: Board | null;
  playerId: number;
  gameId: string;
  playerUuid: string;
  handleRollDice: (diceCollectionType: DiceCollectionType) => void;
}

const BottomRightPanel: React.FC<BottomRightPanelProps> = ({ 
  board, 
  playerId, 
  gameId, 
  playerUuid, 
  handleRollDice 
}) => {
  // Check if the current player is the dice roller
  const isDiceRoller = board?.dice_roller === playerId;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: '1vmin',
      padding: '2vmin',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2vmin'
    }}>
      {board?.current_phase === 'turn_complete' && isDiceRoller ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1vmin',
          width: '100%'
        }}>
          <h3 style={{ 
            margin: '0 0 1vmin 0',
            color: '#333',
            fontSize: '2vmin'
          }}>Your Turn to Roll Dice</h3>
          <button
            onClick={() => handleRollDice(DiceCollectionType.REGULAR)}
            style={{
              padding: '1vmin 3vmin',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '0.5vmin',
              cursor: 'pointer',
              fontSize: '2vmin',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease'
            }}
          >
            Roll Dice
          </button>
        </div>
      ) : (
        <>
          <h3 style={{ 
            margin: '0 0 1vmin 0',
            color: '#333',
            fontSize: '2vmin'
          }}>Dice Results</h3>
          <div style={{
            display: 'flex',
            gap: '1vmin',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '100%'
          }}>
            {board?.dice_result.map((value, index) => (
              <div key={index} style={{
                width: '4vmin',
                height: '4vmin',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: value > 0 ? '#E8F5E9' : '#FFEBEE',
                borderRadius: '0.5vmin',
                border: `1px solid ${value > 0 ? '#4CAF50' : '#F44336'}`,
                color: value > 0 ? '#4CAF50' : '#F44336',
                fontWeight: 'bold',
                fontSize: '2vmin'
              }}>
                {Math.abs(value)}
              </div>
            ))}
          </div>
          {board?.dice_extra !== 0 && (
            <div style={{
              marginTop: '1vmin',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5vmin'
            }}>
              <span style={{ color: '#666', fontSize: '1.5vmin' }}>Extra</span>
              <span style={{ 
                fontWeight: 'bold',
                fontSize: '2.5vmin',
                color: board?.dice_extra !== null && board?.dice_extra !== undefined && board?.dice_extra > 0 ? '#4CAF50' : '#F44336'
              }}>
                {board?.dice_extra !== null && board?.dice_extra !== undefined && board?.dice_extra > 0 ? '+' : ''}{board?.dice_extra}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BottomRightPanel; 