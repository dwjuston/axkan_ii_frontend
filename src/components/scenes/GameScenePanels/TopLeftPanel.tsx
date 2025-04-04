import React from 'react';
import { Board } from '../../../models/game';
import CardDisplay from '../../CardDisplay';
import { isPlayerTurn } from '../../../utils/gameUtils';

interface TopLeftPanelProps {
  board: Board | null;
  opponentName: string;
  playerId: number;
}

const TopLeftPanel: React.FC<TopLeftPanelProps> = ({ board, opponentName, playerId }) => {
  const isTurn = isPlayerTurn(board, playerId);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isTurn ? '#E8F5E9' : 'white',
      borderRadius: '1vmin',
      padding: '2vmin',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        margin: '0 0 1vmin 0',
        color: '#333',
        fontSize: '2vmin'
      }}>Opponent: {opponentName}</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5vmin',
        width: '100%',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex',
          gap: '2vmin',
          marginBottom: '1vmin'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '1.5vmin' }}>Cost</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>${board?.opponent?.cost ?? 0}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '1.5vmin' }}>Value</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>${board?.opponent?.value ?? 0}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '1.5vmin' }}>PNL</span>
            <span style={{ 
              fontWeight: 'bold',
              color: board?.opponent?.pnl !== undefined && board.opponent.pnl >= 0 ? '#4CAF50' : '#F44336'
            }}>${board?.opponent?.pnl ?? 0}</span>
          </div>
        </div>
        <div style={{ 
          display: 'flex',
          width: '100%',
          gap: '1vmin'
        }}>
          {/* Seven Cards (left) */}
          <div style={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5vmin',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '1.5vmin', color: '#666', marginBottom: '0.5vmin' }}>Seven Cards</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5vmin',
              alignItems: 'center'
            }}>
              {board?.opponent.seven_cards.map((card, index) => (
                <CardDisplay key={index} card={card} size="small" />
              ))}
            </div>
          </div>

          {/* Selected Pairs (right) */}
          <div style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5vmin',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '1.5vmin', color: '#666', marginBottom: '0.5vmin' }}>Selected Pairs</div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '0.3vmin',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0.2vmin 0'
            }}>
              {board?.opponent.selected_pairs.map((pair, index) => (
                <CardDisplay key={index} cardPair={pair} size="small" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLeftPanel; 