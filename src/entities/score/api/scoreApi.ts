import { baseApi } from "@/shared/api";
import { ScoringDataDto, ScoringDataResponse } from "../model/scoreTypes";

const scoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendScoringData: build.mutation<ScoringDataResponse, ScoringDataDto>({
      query: (body) => ({
        url: "https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
    }),
  }),
});

export const { useSendScoringDataMutation } = scoreApi;
