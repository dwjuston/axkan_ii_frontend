import { GameResult } from "../../models/game";
import CardDisplay from "../CardDisplay";

interface ResultSceneProps {
  playerId: number;
  gameResult: GameResult | null;
}

const ResultScene = ({ playerId, gameResult }: ResultSceneProps) => {
  if (!gameResult) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2vmin',
        color: '#666'
      }}>
        Loading game results...
      </div>
    );
  }

  const isPlayerWinner = gameResult.winner === playerId;
  const isOpponentWinner = gameResult.winner !== playerId;
  const isDraw = gameResult.winner === -1;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '3vmin',
      height: '100vh',
      boxSizing: 'border-box',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Game Outcome Banner */}
      <div style={{
        width: '100%',
        padding: '2vmin',
        marginBottom: '3vmin',
        borderRadius: '1vmin',
        backgroundColor: isDraw ? '#9E9E9E' : isPlayerWinner ? '#4CAF50' : '#F44336',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 style={{ margin: '0', fontSize: '3vmin' }}>
          {isDraw ? 'Game Ended in a Draw!' : 
            playerId == gameResult?.winner ?  `You Win!` : `Opponent Wins!`}
        </h1>
        <p style={{ margin: '1vmin 0 0 0', fontSize: '2vmin' }}>
          Final Stock Price: ${gameResult.stock_price}
        </p>
      </div>

      {/* Comparison Board */}
      <div style={{
        display: 'flex',
        width: '100%',
        gap: '2vmin',
        justifyContent: 'space-between',
        flex: 1
      }}>
        {/* Player 1 Card */}
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '1vmin',
          padding: '2vmin',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2vmin',
            paddingBottom: '1vmin',
            borderBottom: '1px solid #eee'
          }}>
            <h2 style={{ margin: '0', fontSize: '2.5vmin', color: '#333' }}>
              {gameResult.player_1.name} {gameResult.player_1.player_id === playerId ? '(You)' : '(Opponent)'}
            </h2>
          </div>

          {/* Player 1 Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1vmin',
            marginBottom: '2vmin'
          }}>
            <div style={{ textAlign: 'center', padding: '1vmin', backgroundColor: '#f9f9f9', borderRadius: '0.5vmin' }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>Cost</div>
              <div style={{ fontSize: '2vmin', fontWeight: 'bold' }}>${gameResult.player_1.cost}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1vmin', backgroundColor: '#f9f9f9', borderRadius: '0.5vmin' }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>Value</div>
              <div style={{ fontSize: '2vmin', fontWeight: 'bold' }}>${gameResult.player_1.value}</div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1vmin', 
              backgroundColor: gameResult.player_1.pnl >= 0 ? '#E8F5E9' : '#FFEBEE', 
              borderRadius: '0.5vmin',
              gridColumn: 'span 2'
            }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>PnL</div>
              <div style={{ 
                fontSize: '2.5vmin', 
                fontWeight: 'bold',
                color: gameResult.player_1.pnl >= 0 ? '#4CAF50' : '#F44336'
              }}>
                ${gameResult.player_1.pnl}
              </div>
            </div>
          </div>

          {/* Player 1 Selected Pairs */}
          <div style={{ marginBottom: '2vmin' }}>
            <h3 style={{ fontSize: '2vmin', margin: '0 0 1vmin 0', color: '#333' }}>Selected Pairs</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1vmin',
              justifyContent: 'center'
            }}>
              {gameResult.player_1.selected_pairs.map((pair, index) => (
                <CardDisplay 
                  key={index} 
                  cardPair={pair} 
                  size="small"
                />
              ))}
            </div>
          </div>

          {/* Player 1 Hidden Pair */}
          {gameResult.player_1.hidden_pair && (
            <div>
              <h3 style={{ fontSize: '2vmin', margin: '0 0 1vmin 0', color: '#333' }}>Hidden Pair</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardDisplay 
                  cardPair={gameResult.player_1.hidden_pair} 
                  size="small"
                />
              </div>
            </div>
          )}
        </div>

        {/* Player 2 Card */}
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '1vmin',
          padding: '2vmin',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2vmin',
            paddingBottom: '1vmin',
            borderBottom: '1px solid #eee'
          }}>
            <h2 style={{ margin: '0', fontSize: '2.5vmin', color: '#333' }}>
              {gameResult.player_2.name} {gameResult.player_2.player_id === playerId ? '(You)' : '(Opponent)'}
            </h2>
          </div>

          {/* Player 2 Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1vmin',
            marginBottom: '2vmin'
          }}>
            <div style={{ textAlign: 'center', padding: '1vmin', backgroundColor: '#f9f9f9', borderRadius: '0.5vmin' }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>Cost</div>
              <div style={{ fontSize: '2vmin', fontWeight: 'bold' }}>${gameResult.player_2.cost}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1vmin', backgroundColor: '#f9f9f9', borderRadius: '0.5vmin' }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>Value</div>
              <div style={{ fontSize: '2vmin', fontWeight: 'bold' }}>${gameResult.player_2.value}</div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '1vmin', 
              backgroundColor: gameResult.player_2.pnl >= 0 ? '#E8F5E9' : '#FFEBEE', 
              borderRadius: '0.5vmin',
              gridColumn: 'span 2'
            }}>
              <div style={{ fontSize: '1.5vmin', color: '#666' }}>PnL</div>
              <div style={{ 
                fontSize: '2.5vmin', 
                fontWeight: 'bold',
                color: gameResult.player_2.pnl >= 0 ? '#4CAF50' : '#F44336'
              }}>
                ${gameResult.player_2.pnl}
              </div>
            </div>
          </div>

          {/* Player 2 Selected Pairs */}
          <div style={{ marginBottom: '2vmin' }}>
            <h3 style={{ fontSize: '2vmin', margin: '0 0 1vmin 0', color: '#333' }}>Selected Pairs</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1vmin',
              justifyContent: 'center'
            }}>
              {gameResult.player_2.selected_pairs.map((pair, index) => (
                <CardDisplay 
                  key={index} 
                  cardPair={pair} 
                  size="small"
                />
              ))}
            </div>
          </div>

          {/* Player 2 Hidden Pair */}
          {gameResult.player_2.hidden_pair && (
            <div>
              <h3 style={{ fontSize: '2vmin', margin: '0 0 1vmin 0', color: '#333' }}>Hidden Pair</h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardDisplay 
                  cardPair={gameResult.player_2.hidden_pair} 
                  size="small"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultScene; 