import { Trophy } from "lucide-react";

import {
  ScrollArea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import { cn } from "@/shared/lib";
import { HighScoreResponse } from "../../model/scoreTypes";
import { calcHighScore } from "../../lib/calcHighScore";

interface ScoreboardProps {
  highScores: HighScoreResponse[];
}

export const Scoreboard = ({ highScores }: ScoreboardProps) => {
  const highScoresCalculated: (HighScoreResponse & { score: number })[] =
    highScores.map((highScore) => ({
      ...highScore,
      score: calcHighScore(
        highScore.length,
        highScore.uniqueCharacters,
        highScore.errors,
        highScore.duration
      ),
    }));

  const highScoresSorted = highScoresCalculated.toSorted(
    (a, b) => b.score - a.score
  );

  return (
    <ScrollArea className="h-[40rem]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {highScoresSorted.map((highScore, i) => (
            <TableRow key={highScore.id}>
              <TableCell className="w-[20px] text-gray-400">{i + 1}</TableCell>
              <TableCell>
                <div className="font-medium flex items-center gap-x-2">
                  {i < 3 && (
                    <Trophy
                      className={cn(
                        i === 0 && "stroke-yellow-400",
                        i === 1 && "stroke-slate-400",
                        i === 2 && "stroke-orange-700"
                      )}
                    />
                  )}
                  {highScore.userName}
                </div>
              </TableCell>
              <TableCell className="text-right">{highScore.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
