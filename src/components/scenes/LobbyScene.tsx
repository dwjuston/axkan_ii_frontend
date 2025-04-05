import { useState } from 'react';
import { joinGame, readyGame, clearGame } from '../../utils/apiService';
import { PlayerMetadata } from '../../models/game';
interface LobbySceneProps {
  gameId: string;
  setGameId: (id: string) => void;
  playerUuid: string;
  playerName: string;
  setPlayerUuid: (uuid: string) => void;
  setPlayerName: (name: string) => void;
  opponentUuid: string | null;
  opponentName: string | null;
  opponentReady: boolean;
  setOpponentUuid: (uuid: string | null) => void;
  setOpponentName: (name: string | null) => void;
  setOpponentReady: (ready: boolean) => void;
  countdown: number | null;
}

const LobbyScene = ({
  gameId,
  setGameId,
  playerUuid,
  playerName,
  setPlayerUuid,
  setPlayerName,
  opponentUuid,
  opponentName,
  setOpponentUuid,
  setOpponentName,
  opponentReady,
  setOpponentReady,
  countdown,
}: LobbySceneProps) => {
  const [inputName, setInputName] = useState<string>('');
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  const handleJoin = async () => {
    try {
      const response = await joinGame(inputName);
      
      if (response.error) {
        console.error('Error joining game:', response.error);
        return;
      }
      
      const data = response.data;
      // parse data into GameResponse
      console.log('LobbyScene: handleJoin: data:', data);
      setGameId(data.game_id);
      setPlayerUuid(data.player_uuid);
      setPlayerName(inputName);
      setOpponentUuid(data.opponent_uuid);
      setOpponentName(data.opponent_name);
    } catch (error) {
      console.error('Error joining game:', error);
    }
  };

  const handleReady = async () => {
    try {
      const response = await readyGame(gameId, playerUuid);
      
      if (response.error) {
        console.error('Error getting ready:', response.error);
        return;
      }
      
      setPlayerReady(true);
    } catch (error) {
      console.error('Error getting ready:', error);
    }
  };

  const handleClearGame = async () => {
    try {
      const response = await clearGame();
      
      if (response.error) {
        console.error('Error clearing game:', response.error);
        return;
      }
      
      // Reset game state
      setGameId('');
      setPlayerUuid('');
      setPlayerName('');
      setOpponentUuid(null);
      setOpponentName(null);
      setOpponentReady(false);
      setPlayerReady(false);
      
      console.log('Game cleared successfully');
    } catch (error) {
      console.error('Error clearing game:', error);
    }
  };

  if (!gameId) {
    return (
      <div>
        <button style={{ position: 'absolute', top: '10px', left: '10px' }} onClick={handleClearGame}>Clear Game</button>
        <h2>Join Game</h2>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={handleJoin}>Join</button>
      </div>
    );
  }

  return (
    <div>      
      {countdown !== null && countdown > 0 && (
        <h3>Countdown: {countdown}</h3>
      )}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Current Player Slot */}
        <div style={{ border: '1px solid black', padding: '10px', minWidth: '200px' }}>
          <h4>Player 1</h4>
          <div>
            <p>Name: {playerName}</p>
            <p>Status: {playerReady ? 'Ready' : 'Not Ready'}</p>
            {!playerReady && opponentUuid && (
              <button onClick={handleReady}>Get Ready</button>
            )}
          </div>
        </div>

        {/* Opponent Slot */}
        <div style={{ border: '1px solid black', padding: '10px', minWidth: '200px' }}>
          <h4>Player 2</h4>
          {opponentUuid ? (
            <div>
              <p>Name: {opponentName}</p>
              <p>Status: {opponentReady ? 'Ready' : 'Not Ready'}</p>
            </div>
          ) : (
            <p>Waiting for opponent...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobbyScene; 