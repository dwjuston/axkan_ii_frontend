import { useState } from 'react';
import { DiceCollectionType, Board } from '../../models/game';
import CardDisplay from '../CardDisplay';
import MiddlePanel from './GameScenePanels/MiddlePanel';
import TopLeftPanel from './GameScenePanels/TopLeftPanel';
import BottomLeftPanel from './GameScenePanels/BottomLeftPanel';
import TopMiddlePanel from './GameScenePanels/TopMiddlePanel';
import TopRightPanel from './GameScenePanels/TopRightPanel';
import BottomRightPanel from './GameScenePanels/BottomRightPanel';
import { rollDice } from '../../utils/apiService';

interface GameSceneProps {
  playerId: number;
  gamePhase: string;
  gameId: string;
  playerUuid: string;
  playerName: string;
  opponentUuid: string;
  opponentName: string;
  board: Board | null;
  setBoard: (board: Board | null) => void;
  selectedSpecialCardIndex: number | null;
  setSelectedSpecialCardIndex: (index: number | null) => void;
}

const GameScene = ({ playerId, gamePhase, gameId, playerUuid, playerName, opponentUuid, opponentName, board, setBoard, selectedSpecialCardIndex, setSelectedSpecialCardIndex }: GameSceneProps) => {
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const handleRollDice = async (diceCollectionType: DiceCollectionType, specialCardIndex: number | null) => {
    try {
      setIsRolling(true);
      const response = await rollDice(gameId, playerUuid, diceCollectionType, specialCardIndex);
      
      if (response.error) {
        console.error('Error rolling dice:', response.error);
        setIsRolling(false);
        return;
      }
      
      // Clear the selected special card index after rolling dice
      setSelectedSpecialCardIndex(null);
      
      // Handle successful response if needed
      setIsRolling(false);
    } catch (error) {
      console.error('Error rolling dice:', error);
      setIsRolling(false);
    }
  };

  if (gamePhase === 'game_init') {
    return (
      <div>
        <h2>Game Scene</h2>
        {playerId === 0 ? (
          <div>
            <p>You are Player 1. Please set the initial price by rolling the dice.</p>
            <button 
              onClick={() => handleRollDice(DiceCollectionType.INITIAL, null)}
              disabled={isRolling}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice To Set Initial Price'}
            </button>
          </div>
        ) : (
          <div>
            <p>You are Player 2. Please wait for Player 1 to roll the dice and set the initial price.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'grid',
      gridTemplateColumns: '3fr 4fr 3fr',
      gridTemplateRows: '3fr 4fr 3fr',
      gap: '1vmin',
      backgroundColor: '#f0f0f0',
      padding: '2vmin',
      boxSizing: 'border-box'
    }}>
      {/* Top Row Left 1*/}
      <div className="grid-cell">
        <TopLeftPanel board={board} opponentName={opponentName} playerId={playerId} />
      </div>

      {/* Top Row Middle 2*/}
      <div className="grid-cell">
        <TopMiddlePanel board={board} playerId={playerId} />
      </div>
      
      {/* Top Row Right 3*/}
      <div className="grid-cell">
        <TopRightPanel board={board} />
      </div>
      
      {/* Middle Row Left 4*/}
      <div className="grid-cell">4</div>

      {/* Middle Row Middle 5*/}
      <div className="grid-cell">
        <MiddlePanel 
          board={board} 
          playerId={playerId} 
          playerUuid={playerUuid} 
          gameId={gameId} 
          opponentUuid={opponentUuid}

        />
      </div>

      {/* Middle Row Right 6*/}
      <div className="grid-cell">6</div>
      
      {/* Bottom Row Left 7*/}
      <div className="grid-cell">
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

      {/* Bottom Row Middle 8*/}
      <div className="grid-cell">8</div>

      {/* Bottom Row Right 9*/}
      <div className="grid-cell">
        <BottomRightPanel 
          board={board} 
          playerId={playerId} 
          gameId={gameId} 
          playerUuid={playerUuid} 
          handleRollDice={handleRollDice}
          selectedSpecialCardIndex={selectedSpecialCardIndex}
        />
      </div>


    </div>
  );
};

export default GameScene; 