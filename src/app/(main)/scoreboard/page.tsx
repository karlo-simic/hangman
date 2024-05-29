import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { getHighScores } from "@/entities/score/api/getHighScores";
import { Button } from "@/shared/ui";
import { Scoreboard } from "@/entities/score/ui/scoreboard/scoreboard";

export default async function Page() {
  const highScores = await getHighScores();
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-5xl font-bold text-center">Scoreboard</h1>
      <div className="flex items-center">
        <Button variant="outline" asChild>
          <Link href="/game">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Play again
          </Link>
        </Button>
      </div>
      <Scoreboard highScores={highScores} />
    </div>
  );
}
