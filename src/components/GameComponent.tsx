import { useEffect, useRef, useState } from 'react';
import { handleGameMessage } from '../utils/messageHandler';
import LobbyScene from './scenes/LobbyScene';
import GameScene from './scenes/GameScene';
import { Board, GamePhase, GameResult } from '../models/game';
import ReviewScene from './scenes/ReviewScene';
import ResultScene from './scenes/ResultScene';


const GameComponent = () => {
  // game level
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<number>(-1);
  const [gamePhase, setGamePhase] = useState<GamePhase>('lobby');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [selectedSpecialCardIndex, setSelectedSpecialCardIndex] = useState<number | null>(null);

  // own ids
  const [playerUuid, setPlayerUuid] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');

  // opponent ids
  const [opponentUuid, setOpponentUuid] = useState<string | null>(null);
  const [opponentName, setOpponentName] = useState<string | null>(null);
  const [opponentReady, setOpponentReady] = useState<boolean>(false);
  // useeef
  const opponentUuidRef = useRef(opponentUuid);
  const playerUuidRef = useRef(playerUuid);


  useEffect(() => {

    if (gameId && playerUuid) {
      console.log('Establishing WebSocket connection...');
      const ws = new WebSocket(
        `ws://127.0.0.1:8000/api/v1/games/ws?game_id=${gameId}&player_uuid=${playerUuid}`
      );

      ws.onopen = () => {
        console.log('WebSocket connection established');
      };

      ws.onmessage = (event) => {
        const message = handleGameMessage(event.data, setOpponentUuid, setOpponentName, setOpponentReady, 
            opponentUuidRef.current, setPlayerId, playerUuidRef.current, 
            setCountdown, setGamePhase, setBoard, setGameResult);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
      };

      return () => {
        console.log('Cleaning up WebSocket connection...');
        ws.close();
      };
    }
  }, [gameId, playerUuid]);

  useEffect(() => {
    opponentUuidRef.current = opponentUuid;
    playerUuidRef.current = playerUuid;
  }, [playerUuid, playerName, opponentUuid, opponentName, playerId]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setGamePhase('game_init');
    }
  }, [countdown]);

  useEffect(() => {
    console.log('Game Phase:', gamePhase);
  }, [gamePhase]);

  // runtime check
  if (gamePhase !== 'lobby' && (!gameId || !playerUuid || !playerName || !opponentUuid || !opponentName || playerId === -1)) {
    throw new Error('Required game state values are missing');
  }

  return (
    <div>
      
      {gamePhase === 'lobby' && (
        <div>
          <h1>Game Component</h1>
          <LobbyScene 
            gameId={gameId}
            setGameId={setGameId}
            playerUuid={playerUuid}
            playerName={playerName}
            setPlayerUuid={setPlayerUuid}
          setPlayerName={setPlayerName}
          opponentUuid={opponentUuid}
          opponentName={opponentName}
          setOpponentUuid={setOpponentUuid}
            setOpponentName={setOpponentName}
            opponentReady={opponentReady}
            setOpponentReady={setOpponentReady}
            countdown={countdown}
          />
        </div>
      )}

      {gamePhase !== 'lobby' && gamePhase !== 'final_review' && gamePhase !== 'game_end' && (
        <GameScene 
            playerId={playerId}
            gamePhase={gamePhase}
            gameId={gameId}
            playerUuid={playerUuid}
            playerName={playerName}
            opponentUuid={opponentUuid || ''}
            opponentName={opponentName || ''}
            board={board}
            setBoard={setBoard}
            selectedSpecialCardIndex={selectedSpecialCardIndex}
            setSelectedSpecialCardIndex={setSelectedSpecialCardIndex}
        />
      )}


    {gamePhase === 'final_review' && (
        <ReviewScene
            playerId={playerId}
            gamePhase={gamePhase}
            gameId={gameId}
            playerUuid={playerUuid}
            playerName={playerName}
            opponentUuid={opponentUuid || ''}
            opponentName={opponentName || ''}
            board={board}
            selectedSpecialCardIndex={selectedSpecialCardIndex}
            setSelectedSpecialCardIndex={setSelectedSpecialCardIndex}
        />
    )}

    {gamePhase === 'game_end' && (
        <ResultScene
            playerId={playerId}
            gameResult={gameResult}
        />
    )}

    </div>
  );
};

export default GameComponent; 