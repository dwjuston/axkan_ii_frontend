import React from 'react';
import { Board } from '../../../models/game';
import { isPlayerTurn } from '../../../utils/gameUtils';

interface TopMiddlePanelProps {
  board: Board | null;
  playerId: number;
}

const TopMiddlePanel: React.FC<TopMiddlePanelProps> = ({ board, playerId }) => {
  const isTurn = isPlayerTurn(board, playerId);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: isTurn ? '#E8F5E9' : 'white',
      borderRadius: '1vmin',
      padding: '2vmin',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1vmin'
    }}>
      <h3 style={{ 
        margin: '0 0 1vmin 0',
        color: '#333',
        fontSize: '2vmin'
      }}>Game Phase</h3>
      <div style={{
        fontSize: '2.5vmin',
        fontWeight: 'bold',
        color: '#4CAF50'
      }}>
        {board?.current_phase.replace(/_/g, ' ').toUpperCase()}
      </div>
      <div style={{
        fontSize: '2vmin',
        fontWeight: 'bold',
        color: isTurn ? '#4CAF50' : '#F44336',
        marginTop: '1vmin'
      }}>
        {isTurn ? "You can select a pair now" : "Waiting for opponent..."}
      </div>
    </div>
  );
};

export default TopMiddlePanel; 