import React from 'react';
import { Board } from '../../../models/game';

interface TopRightPanelProps {
  board: Board | null;
}

const TopRightPanel: React.FC<TopRightPanelProps> = ({ board }) => {
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
      gap: '1vmin'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5vmin'
      }}>
        <span style={{ color: '#666', fontSize: '1.5vmin' }}>Turn</span>
        <span style={{ 
          fontWeight: 'bold',
          fontSize: '2.5vmin',
          color: '#333'
        }}>{board?.turn_number ?? 0}</span>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5vmin'
      }}>
        <span style={{ color: '#666', fontSize: '1.5vmin' }}>Stock Price</span>
        <span style={{ 
          fontWeight: 'bold',
          fontSize: '2.5vmin',
          color: board?.stock_price !== null && board?.stock_price !== undefined && board?.stock_price > 0 ? '#4CAF50' : '#F44336'
        }}>${board?.stock_price ?? 0}</span>
      </div>
    </div>
  );
};

export default TopRightPanel; 