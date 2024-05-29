"use server";

import { axiosInstance } from "@/shared/api";
import { HighScoreResponse } from "../model/scoreTypes";

export const getHighScores = async (): Promise<HighScoreResponse[]> => {
  const res = await axiosInstance.get<HighScoreResponse[]>(
    "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores"
  );

  return res.data;
};
