"use client";

import { useEffect, useState } from "react";
import { Loader2, RotateCcw, ChevronsRight, Check } from "lucide-react";

import {
  useCachedQuoteSometime,
  type QuoteResponse,
  MaskedQuoteText,
} from "@/entities/quote";
import { Button } from "@/shared/ui";
import {
  ONLY_LETTERS,
  arePrimitiveArraysEqual,
  cn,
  useAppSelector,
} from "@/shared/lib";
import { axiosInstance } from "@/shared/api";
import {
  HANGMAN_MAX_ERRORS,
  HangmanInput,
  HangmanState,
} from "@/entities/hangman";
import { useSendScoringDataMutation } from "@/entities/score";
import Link from "next/link";
import { GameStatus } from "./game-status";

interface HangmanProps {
  enableCheat?: boolean;
}

const getAllUniqueLetters = (quote: string): string[] => {
  return Array.from(
    new Set(
      quote
        .split("")
        .filter((char) => ONLY_LETTERS.test(char))
        .map((char) => char.toLowerCase())
    )
  );
};

export const Hangman = ({ enableCheat }: HangmanProps) => {
  // State
  const [allLetters, setAllLetters] = useState<string[]>([]);
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | undefined>();
  const [duration, setDuration] = useState<number | undefined>();
  const [errors, setErrors] = useState<number>(0);
  const [gameState, setGameState] = useState<HangmanState>("loading");

  const userName = useAppSelector((state) => state.user.userName);

  // API requests
  const [
    sendScoringData,
    { isLoading: isSendingScore, isSuccess: isScoreSent },
  ] = useSendScoringDataMutation();

  const { quoteData, status, error, onResolve, onReject, refetch } =
    useCachedQuoteSometime(() =>
      axiosInstance.get<QuoteResponse>("https://api.quotable.io/random")
    );

  onResolve((data) => {
    const allUniqueCharacters = getAllUniqueLetters(data.content);
    setAllLetters(allUniqueCharacters);
    if (enableCheat) {
      setRevealedLetters(allUniqueCharacters.slice(1));
      setSelectedLetters(allUniqueCharacters.slice(1));
    }
    setGameState("playing");
    setStartTime(Date.now());
  });

  onReject(() => {
    setGameState("error");
  });

  const sendScores = (): void => {
    if (!quoteData || !startTime || !duration || !userName) return;

    sendScoringData({
      errors,
      userName,
      quoteId: quoteData._id,
      duration: duration,
      length: quoteData.content.length,
      uniqueCharacters: allLetters.length,
    });
  };

  const handleSelect = (letter: string): void => {
    if (gameState !== "playing") return;

    // Mark letter as selected
    setSelectedLetters((prev) => {
      const lettersUnique = Array.from(new Set([...prev, letter]));
      return lettersUnique;
    });

    const isCorrectLetter = allLetters.includes(letter);

    // If user has hit a correct letter
    if (isCorrectLetter) {
      const newRevealedLettersUnique = Array.from(
        new Set([...revealedLetters, letter])
      );
      setRevealedLetters(newRevealedLettersUnique);

      // Check if user has revealed all letters
      if (arePrimitiveArraysEqual(newRevealedLettersUnique, allLetters)) {
        setGameState("victory");
        if (startTime) setDuration(Date.now() - startTime);
      }
      return;
    }

    // If user has hit a wrong letter but still has enough lives
    if (!isCorrectLetter && errors < HANGMAN_MAX_ERRORS) {
      setErrors((prev) => prev + 1);
      return;
    }

    // If user has hit a wrong letter and doesn't have any lives left
    if (!isCorrectLetter && errors === HANGMAN_MAX_ERRORS) {
      setGameState("defeat");
      setRevealedLetters(allLetters);
      if (startTime) setDuration(Date.now() - startTime);
    }
  };

  const restart = (): void => {
    setAllLetters([]);
    setRevealedLetters([]);
    setSelectedLetters([]);
    setErrors(0);
    setGameState("loading");
    refetch();
  };

  // When user wins the game send game data to the server
  useEffect(() => {
    if (gameState === "victory") {
      sendScores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  if (status === "pending")
    return (
      <div className="flex-1 grid place-items-center">
        <h4 className="text-xl font-semibold">Loading...</h4>
      </div>
    );

  if (status === "error" || !quoteData) {
    return (
      <div className="flex-1 grid place-items-center">
        <h4 className="text-xl font-semibold">Something went wrong</h4>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-y-14 items-center">
      {/* Status */}
      <GameStatus errors={errors} gameState={gameState} />
      {/* Header */}
      <div className="flex justify-between w-full items-center flex-wrap gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <Button
            variant={gameState === "defeat" ? "destructive" : "outline"}
            onClick={restart}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            New word
          </Button>
          <Button variant="outline" asChild>
            <Link href="/welcome">Change name</Link>
          </Button>
          <p className="text-sm text-stone-500">Playing as: {userName}</p>
        </div>
        <div className="flex items-center flex-wrap gap-4">
          {isSendingScore && (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 stroke-stone-500 animate-spin" />
              <p className="text-sm text-stone-500">Saving your score...</p>
            </div>
          )}
          {!isSendingScore && isScoreSent && (
            <div className="flex items-center">
              <Check className="mr-2 h-4 w-4 stroke-stone-500" />
              <p className="text-sm text-stone-500">
                Your score has been saved
              </p>
            </div>
          )}
          {gameState === "victory" && (
            <Button type="button" asChild>
              <Link href="/scoreboard">
                See scoreboard
                <ChevronsRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      {/* Masked quote */}
      <MaskedQuoteText
        base={quoteData.content}
        revealed={new Set(revealedLetters)}
      />
      {/* Input */}
      <HangmanInput
        selected={new Set(selectedLetters)}
        onSelect={handleSelect}
      />
    </div>
  );
};
