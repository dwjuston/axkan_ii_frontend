import { useState } from 'react';

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
      const response = await fetch('http://127.0.0.1:8000/api/v1/games/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_name: inputName }),
      });

      const data = await response.json();
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
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/games/ready?game_id=${gameId}&player_uuid=${playerUuid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      setPlayerReady(true);
    } catch (error) {
      console.error('Error getting ready:', error);
    }
  };

  if (!gameId) {
    return (
      <div>
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
      <h2>Game Room: {gameId}</h2>
      
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