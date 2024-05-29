export { useSendScoringDataMutation } from "./api/scoreApi";
export type {
  ScoringDataDto,
  HighScoreResponse,
  ScoringDataResponse,
} from "./model/scoreTypes";
export { Scoreboard } from "./ui/scoreboard/scoreboard";
export { calcHighScore } from "./lib/calcHighScore";
