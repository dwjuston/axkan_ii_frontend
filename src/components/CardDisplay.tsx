import { Card, CardPair } from '../models/game';
import { useState } from 'react';

interface CardDisplayProps {
  card?: Card;
  cardPair?: CardPair;
  size?: 'small' | 'medium' | 'large';
  isHighlighted?: boolean;
  isInteractive?: boolean;
  onClick?: () => void;
}

const getSuitSymbol = (suit: string) => {
  switch (suit) {
    case 'heart': return '♥';
    case 'diamond': return '♦';
    case 'spade': return '♠';
    case 'club': return '♣';
    default: return '';
  }
};

const getSuitColor = (suit: string) => {
  return suit === 'heart' || suit === 'diamond' ? '#FF0000' : '#000000';
};

const getRankDisplay = (rank: number) => {
  switch (rank) {
    case 1: return 'A';
    case 11: return 'J';
    case 12: return 'Q';
    case 13: return 'K';
    default: return rank.toString();
  }
};

const CardComponent = ({ card, size = 'medium', isHighlighted = false, isInteractive = false, onClick }: { 
  card: Card, 
  size: 'small' | 'medium' | 'large',
  isHighlighted?: boolean,
  isInteractive?: boolean,
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sizeMap = {
    small: { width: '40px', height: '60px', fontSize: '16px' },
    medium: { width: '60px', height: '90px', fontSize: '24px' },
    large: { width: '80px', height: '120px', fontSize: '32px' }
  };

  const dimensions = sizeMap[size];

  return (
    <div 
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: 'white',
        borderRadius: '8px',
        border: isHighlighted ? '3px solid #4CAF50' : isHovered && isInteractive ? '2px solid #2196F3' : '2px solid #333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '8px',
        boxShadow: isHighlighted 
          ? '0 0 10px rgba(76, 175, 80, 0.7)' 
          : isHovered && isInteractive
            ? '0 0 10px rgba(33, 150, 243, 0.8)'
            : isInteractive 
              ? '0 0 5px rgba(33, 150, 243, 0.5)' 
              : '0 2px 4px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        cursor: isInteractive || isHighlighted ? 'pointer' : 'default',
        transform: isHighlighted || (isHovered && isInteractive) ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        color: getSuitColor(card.suit),
        fontSize: dimensions.fontSize,
        fontWeight: 'bold',
        position: 'absolute',
        top: '4px',
        left: '4px'
      }}>
        {getRankDisplay(card.rank)}
      </div>
      <div style={{
        color: getSuitColor(card.suit),
        fontSize: dimensions.fontSize,
        position: 'absolute',
        bottom: '4px',
        right: '4px',
        transform: 'rotate(180deg)'
      }}>
        {getRankDisplay(card.rank)}
      </div>
      <div style={{
        color: getSuitColor(card.suit),
        fontSize: dimensions.fontSize,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {getSuitSymbol(card.suit)}
      </div>
    </div>
  );
};

const CardPairComponent = ({ 
  cardPair, 
  size = 'medium', 
  isHighlighted = false, 
  isInteractive = false,
  onClick
}: { 
  cardPair: CardPair, 
  size: 'small' | 'medium' | 'large',
  isHighlighted?: boolean,
  isInteractive?: boolean,
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: isInteractive ? 'pointer' : 'default',
        transform: isHighlighted || (isHovered && isInteractive) ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease',
        padding: '4px',
        borderRadius: '8px',
        backgroundColor: isInteractive 
          ? isHovered 
            ? 'rgba(33, 150, 243, 0.1)' 
            : 'rgba(33, 150, 243, 0.05)' 
          : 'transparent',
        boxShadow: isHovered && isInteractive ? '0 0 10px rgba(33, 150, 243, 0.5)' : 'none'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardComponent 
        card={cardPair.big_card} 
        size={size} 
        isHighlighted={isHighlighted}
        isInteractive={isInteractive}
      />
      <CardComponent 
        card={cardPair.small_card} 
        size={size} 
        isHighlighted={isHighlighted}
        isInteractive={isInteractive}
      />
      <div style={{
        fontSize: '12px',
        color: '#666',
        marginTop: '4px',
        fontWeight: isInteractive ? 'bold' : 'normal'
      }}>
        {cardPair.breakeven ?? '>=9'}
      </div>
    </div>
  );
};

const CardDisplay = ({ 
  card, 
  cardPair, 
  size = 'medium', 
  isHighlighted = false, 
  isInteractive = false,
  onClick
}: CardDisplayProps) => {
  if (cardPair) {
    return <CardPairComponent 
      cardPair={cardPair} 
      size={size} 
      isHighlighted={isHighlighted}
      isInteractive={isInteractive}
      onClick={onClick}
    />;
  }
  if (card) {
    return <CardComponent 
      card={card} 
      size={size} 
      isHighlighted={isHighlighted}
      isInteractive={isInteractive}
      onClick={onClick}
    />;
  }
  return null;
};

export default CardDisplay; 