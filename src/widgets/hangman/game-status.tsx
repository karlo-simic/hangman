import { HANGMAN_MAX_ERRORS, HangmanState } from "@/entities/hangman";
import { cn } from "@/shared/lib";

interface GameStatusProps {
  gameState: HangmanState;
  errors: number;
}

export const GameStatus = ({ errors, gameState }: GameStatusProps) => {
  return (
    <div className="flex justify-center w-full items-center flex-wrap gap-4">
      <h3
        className={cn(
          "text-3xl font-bold",
          gameState === "defeat" && "text-red-500"
        )}
      >
        {gameState !== "defeat" &&
          gameState !== "victory" &&
          `${errors}/${HANGMAN_MAX_ERRORS}`}
        {gameState === "defeat" && "You lost!"}
        {gameState === "victory" && "You win!"}
      </h3>
    </div>
  );
};
