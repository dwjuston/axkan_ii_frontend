import React, { useEffect, useState } from 'react';
import { Board } from '../../../models/game';
import CardDisplay from '../../CardDisplay';
import { isPlayerTurn } from '../../../utils/gameUtils';
import { convertColor } from '../../../utils/apiService';

interface BottomLeftPanelProps {
  board: Board | null;
  gameId: string;
  playerName: string;
  playerId: number;
  playerUuid: string;
  selectedSpecialCardIndex: number | null;
  setSelectedSpecialCardIndex: (index: number | null) => void;
}

const BottomLeftPanel: React.FC<BottomLeftPanelProps> = ({ 
  board, 
  gameId, 
  playerName, 
  playerId, 
  playerUuid,
  selectedSpecialCardIndex,
  setSelectedSpecialCardIndex 
}) => {
  const isTurn = isPlayerTurn(board, playerId);
  const [isHighlightMode, setIsHighlightMode] = useState<boolean>(false);
  const [isInteractMode, setIsInteractMode] = useState<boolean>(false);

  useEffect(() => {
    // Determine if highlighting is allowed
    const isDiceRoller = board?.dice_roller === playerId;
    const isTurnComplete = board?.current_phase === 'turn_complete';
    const isFinalReview = board?.current_phase === 'final_review';
    
    // Allow highlighting in both turn_complete (if dice roller) and final_review phases
    setIsHighlightMode((isTurnComplete && isDiceRoller) || isFinalReview);
    
    // Determine if interaction is allowed
    console.log(`wow is it null: ${selectedSpecialCardIndex === null}`);
    setIsInteractMode(isFinalReview && selectedSpecialCardIndex !== null);
    
    // Reset states when phase changes
    if (board?.current_phase !== 'turn_complete' && board?.current_phase !== 'final_review') {
      setSelectedSpecialCardIndex(null);
    }
  }, [board?.current_phase, board?.dice_roller, playerId, selectedSpecialCardIndex]);

  const handleSpecialCardClick = (index: number) => {
    if (isHighlightMode) {
      // Toggle the highlighted card - if it's already highlighted, unselect it
      const newIndex = selectedSpecialCardIndex === index ? null : index;
      setSelectedSpecialCardIndex(newIndex);
      
      // Notify parent component about the selection
      setSelectedSpecialCardIndex(newIndex);
      console.log(`newIndex: ${newIndex}`);
      console.log(`selectedSpecialCardIndex: ${selectedSpecialCardIndex}`);
    } 
  };

  const onColorConvert = async (cardIndex: number) => {
    if (cardIndex === -1) {
      // This is the hidden pair
      console.log(`Converting color for hidden pair because of the special card index ${selectedSpecialCardIndex}`);
    } else {
      // This is a regular card
      console.log(`Converting color for selected pair at index ${cardIndex} because of the special card index ${selectedSpecialCardIndex}`);
    }
    
    try {
      const response = await convertColor(
        gameId, 
        playerUuid, 
        cardIndex, 
        selectedSpecialCardIndex || 0
      );

      if (response.error) {
        console.error('Error converting color:', response.error);
        return;
      }

      // remove the special card
      setSelectedSpecialCardIndex(null);

    } catch (error) {
      console.error('Error converting color:', error);
    }
  };

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
      }}>Player: {playerName}</h3>
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
            <span style={{ fontWeight: 'bold', color: '#333' }}>${board?.current_player?.cost ?? 0}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '1.5vmin' }}>Value</span>
            <span style={{ fontWeight: 'bold', color: '#333' }}>${board?.current_player?.value ?? 0}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#666', fontSize: '1.5vmin' }}>PNL</span>
            <span style={{ 
              fontWeight: 'bold',
              color: board?.current_player?.pnl !== undefined && board.current_player.pnl >= 0 ? '#4CAF50' : '#F44336'
            }}>${board?.current_player?.pnl ?? 0}</span>
          </div>
        </div>
        <div style={{ 
          display: 'flex',
          width: '100%',
          gap: '1vmin'
        }}>
          {/* Seven Cards (left) */}
          <div style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5vmin',
            alignItems: 'center'
          }}>
            <div style={{ 
              fontSize: '1.5vmin', 
              color: '#666', 
              marginBottom: '0.5vmin',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5vmin'
            }}>
              Seven Cards
              {board?.current_phase === 'turn_complete' && board?.dice_roller === playerId && (
                <span style={{ 
                  fontSize: '1.2vmin', 
                  color: '#4CAF50', 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  padding: '0.2vmin 0.5vmin',
                  borderRadius: '0.3vmin'
                }}>
                  (Dice Roller)
                </span>
              )}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5vmin',
              alignItems: 'center'
            }}>
              {board?.current_player.seven_cards.map((card, index) => (
                <CardDisplay 
                  key={index} 
                  card={card} 
                  size="small" 
                  isHighlighted={index === selectedSpecialCardIndex}
                  isInteractive={isHighlightMode}
                  onClick={() => handleSpecialCardClick(index)}
                />
              ))}
            </div>
          </div>

          {/* Selected Pairs (middle) */}
          <div style={{
            width: '60%',
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
              {board?.current_player.selected_pairs.map((pair, index) => (
                <CardDisplay 
                  key={index} 
                  cardPair={pair} 
                  size="small" 
                  isInteractive={isInteractMode}
                  onClick={() => isInteractMode && onColorConvert(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Hidden Pair (right) */}
          <div style={{
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5vmin',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '1.5vmin', color: '#666', marginBottom: '0.5vmin' }}>Hidden Pair</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5vmin',
              alignItems: 'center'
            }}>
              {board?.current_player.hidden_pair ? (
                <CardDisplay 
                  cardPair={board.current_player.hidden_pair} 
                  size="small" 
                  isInteractive={isInteractMode}
                  onClick={() => isInteractMode && onColorConvert(-1)}
                />
              ) : (
                <div style={{ 
                  fontSize: '1.2vmin', 
                  color: '#999', 
                  textAlign: 'center',
                  padding: '1vmin'
                }}>
                  No hidden pair
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomLeftPanel; 