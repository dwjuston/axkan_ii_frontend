import { Board, GamePhase } from '../../models/game';
import BottomLeftPanel from './GameScenePanels/BottomLeftPanel';
import { useState } from 'react';
import { endReview } from '../../utils/apiService';

interface ReviewSceneProps {
  playerId: number;
  gameId: string;
  playerUuid: string;
  playerName: string;
  board: Board | null;
  selectedSpecialCardIndex: number | null;
  setSelectedSpecialCardIndex: (index: number | null) => void;
}




const ReviewScene = ({ playerId, gameId, playerUuid, playerName, board, selectedSpecialCardIndex, setSelectedSpecialCardIndex }: ReviewSceneProps ) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isReviewEnded, setIsReviewEnded] = useState(false);

  
  const onEndReview = async () => {
    if (isReviewEnded) return;
    
    try {
      const response = await endReview(gameId, playerUuid);
      
      if (response.error) {
        console.error('Error ending review:', response.error);
        return;
      }
  
      // set game phase
      setIsReviewEnded(true);
  
    } catch (error) {
      console.error('Error ending review:', error);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: '30% 70%',
      height: '100vh',
      width: '100%',
      gap: '10px',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Top Section: display Final Review, stock price, dice result, dice extra */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto'
      }}>
        <h3 style={{ 
          margin: '0 0 1vmin 0',
          color: '#333',
          fontSize: '2vmin'
        }}>Stock Price: {board?.stock_price}</h3>
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
        {isReviewEnded ? (
          <div style={{
            marginTop: '2vmin',
            padding: '1vmin 3vmin',
            backgroundColor: '#9E9E9E',
            color: 'white',
            border: 'none',
            borderRadius: '0.5vmin',
            fontSize: '2vmin',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1vmin'
          }}>
            <span>Review Ended</span>
            <span style={{ fontSize: '1.5vmin' }}>✓</span>
          </div>
        ) : (
          <button 
            onClick={onEndReview}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onMouseDown={() => setIsButtonPressed(true)}
            onMouseUp={() => setIsButtonPressed(false)}
            style={{
              marginTop: '2vmin',
              padding: '1vmin 3vmin',
              backgroundColor: isButtonPressed ? '#2E7D32' : isButtonHovered ? '#3E8E41' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '0.5vmin',
              fontSize: '2vmin',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: isButtonPressed 
                ? '0 1px 2px rgba(0, 0, 0, 0.2)' 
                : isButtonHovered 
                  ? '0 4px 8px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
              transform: isButtonHovered && !isButtonPressed ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            End Review
          </button>
        )}
      </div>

      {/* Bottom Section */}
      <BottomLeftPanel 
        board={board}
        gameId={gameId}
        playerName={playerName}
        playerId={playerId}
        playerUuid={playerUuid}
        selectedSpecialCardIndex={selectedSpecialCardIndex}
        setSelectedSpecialCardIndex={setSelectedSpecialCardIndex}
      />

    </div>
  );
};

export default ReviewScene; 