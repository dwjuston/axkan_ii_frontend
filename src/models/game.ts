export type GamePhase = 
  | 'lobby'
  | 'game_start'
  | 'game_init'
  | 'turn_start'
  | 'turn_select_first'
  | 'turn_select_second'
  | 'turn_complete'
  | 'final_review'
  | 'game_end';

export type CardSuit = 'heart' | 'diamond' | 'spade' | 'club';

export type CardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  suit: CardSuit;
  rank: CardRank;
}

export interface CardPair {
  small_card: Card;
  big_card: Card;
  breakeven: string;
}

export interface PlayerView {
  uuid: string;
  player_id: number;
  name: string;
  selected_pairs: CardPair[];
  seven_cards: Card[];
  hidden_pair: CardPair | null;
  pnl: number;
  cost: number;
  value: number;
}

export interface OpponentView {
  uuid: string;
  name: string;
  player_id: number;
  selected_pairs: CardPair[];
  seven_cards: Card[];
  pnl: number;
  cost: number;
  value: number;
}

export interface Board {
  current_phase: GamePhase;
  turn_number: number;
  dice_result: number[];
  dice_extra: number;
  stock_price: number | null;
  first_selector: number | null;
  second_selector: number | null;
  dice_roller: number | null;
  available_pairs: CardPair[];
  selected_pair_index: Record<string, number>;
  current_player: PlayerView;
  opponent: OpponentView;
}

export interface GameResult {
  winner: number;
  stock_price: number;
  player_1: PlayerView;
  player_2: PlayerView;
}

export interface PlayerMetadata {
  game_id: string;
  player_uuid: string;
  player_name: string;
  opponent_uuid: string | null;
  opponent_name: string | null;
}

export enum DiceCollectionType {
  INITIAL = 'initial',      // 1 positive
  REGULAR = 'regular',      // 1 positive, 1 negative
  INFLATION = 'inflation',    // 2 positive, 1 negative
  TAPERING = 'tapering',     // 1 positive, 2 negative
  STIMULUS = 'stimulus',     // 1 positive
  TARIFF = 'tariff',       // 1 negative
  SOFT_LANDING = 'soft_landing',      // 1 positive, 1 negative, result +1
  SUPPLY_SHOCK = 'supply_shock',      // 1 positive, 1 negative, result -1
} 