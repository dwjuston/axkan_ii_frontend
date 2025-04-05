import React, { useState } from 'react';
import { Board, DiceCollectionType } from '../../../models/game';

interface BottomRightPanelProps {
  board: Board | null;
  playerId: number;
  handleRollDice: (diceCollectionType: DiceCollectionType, specialCardIndex: number | null) => void;
  selectedSpecialCardIndex: number | null;
}

const BottomRightPanel: React.FC<BottomRightPanelProps> = ({ 
  board, 
  playerId,  
  handleRollDice,
  selectedSpecialCardIndex
}) => {
  // Check if the current player is the dice roller
  const isDiceRoller = board?.dice_roller === playerId;
  const [selectedDiceType, setSelectedDiceType] = useState<DiceCollectionType | null>(null);
  
  const handleDiceTypeSelect = (type: DiceCollectionType) => {
    setSelectedDiceType(type);
  };
  
  const handleRollDiceClick = () => {
    if (selectedDiceType) {
      console.log(`Selected dice type: ${selectedDiceType} for card at index ${selectedSpecialCardIndex}`);
      handleRollDice(selectedDiceType, selectedSpecialCardIndex);
      setSelectedDiceType(null);
    }
  };
  
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
          
          {selectedSpecialCardIndex !== null ? (
            <>
              <div style={{ fontSize: '1.5vmin', color: '#666', marginBottom: '0.5vmin' }}>
                Special Card Selected: {selectedSpecialCardIndex + 1}
              </div>
              
              <div style={{ width: '100%', marginBottom: '1vmin' }}>
                <div style={{ fontSize: '1.2vmin', color: '#666', marginBottom: '0.5vmin' }}>Select Dice Type:</div>
                <select 
                  value={selectedDiceType || ''} 
                  onChange={(e) => handleDiceTypeSelect(e.target.value as DiceCollectionType)}
                  style={{
                    padding: '0.5vmin',
                    borderRadius: '0.3vmin',
                    border: '1px solid #ccc',
                    fontSize: '1.2vmin',
                    width: '100%'
                  }}
                >
                  <option value="">Select a dice type</option>
                  <option value={DiceCollectionType.INFLATION}>Inflation (2 positive, 1 negative)</option>
                  <option value={DiceCollectionType.TAPERING}>Tapering (1 positive, 2 negative)</option>
                  <option value={DiceCollectionType.STIMULUS}>Stimulus (1 positive)</option>
                  <option value={DiceCollectionType.TARIFF}>Tariff (1 negative)</option>
                  <option value={DiceCollectionType.SOFT_LANDING}>Soft Landing (1 positive, 1 negative, result +1)</option>
                  <option value={DiceCollectionType.SUPPLY_SHOCK}>Supply Shock (1 positive, 1 negative, result -1)</option>
                </select>
              </div>
              
              {selectedDiceType && (
                <button
                  onClick={handleRollDiceClick}
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
              )}
            </>
          ) : (
            <button
              onClick={() => handleRollDice(DiceCollectionType.REGULAR, null)}
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
          )}
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
          {board?.dice_extra !== 0 && board && (
            <div style={{
              marginTop: '1vmin',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5vmin',
              color: board.dice_extra > 0 ? '#4CAF50' : '#F44336',
              fontWeight: 'bold'
            }}>
              <span>Extra: {board.dice_extra > 0 ? '+' : ''}{board.dice_extra}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BottomRightPanel; 