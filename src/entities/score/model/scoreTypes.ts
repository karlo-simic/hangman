/* Responses */
export interface ScoringDataResponse {
  id: number;
}

export interface HighScoreResponse {
  id: number;
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}

/* DTOs */
export interface ScoringDataDto {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}
