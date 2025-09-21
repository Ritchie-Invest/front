export interface LifeStatus {
  livesRemaining: number;
  nextLifeIn: number;
  isOutOfLives: boolean;
}

export interface UserLifeResponse {
  livesRemaining: number;
  nextLifeIn: number;
}
