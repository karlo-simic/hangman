"use client";

import { Card } from "@/shared/ui";
import { ONLY_LETTERS } from "@/shared/lib";

interface MaskedQuoteTextProps {
  base: string;
  revealed: Set<string>;
}

interface MaskedQuoteTextItemProps {
  char: string;
  revealed: Set<string>;
}

const MaskedQuoteTextItem = ({ char, revealed }: MaskedQuoteTextItemProps) => {
  const isHidden = ONLY_LETTERS.test(char) && !revealed.has(char.toLowerCase());

  return (
    <Card
      className="lg:h-16 lg:w-10 grid place-items-center lg:text-xl cursor-default sm:h-8 sm:w-8 sm:text-base text-xs w-6 h-6"
      data-testid="masked-quote-character"
      aria-label={isHidden ? "Hidden character" : char}
      role="presentation"
    >
      {!isHidden && char}
    </Card>
  );
};

export const MaskedQuoteText = ({ base, revealed }: MaskedQuoteTextProps) => {
  const words = base.split(" ");

  return (
    <ul
      className="flex flex-wrap lg:gap-x-8 lg:gap-y-2 gap-x-4 gap-y-1 justify-center"
      aria-label="Masked Quote"
      role="list"
    >
      {words.map((word, wordIndex) => (
        <li
          key={`word-${wordIndex}`}
          aria-label={`Word ${wordIndex + 1}`}
          role="listitem"
        >
          <ul
            className="flex lg:gap-2 gap-1 flex-wrap"
            data-testid="masked-quote-character-list"
            role="list"
          >
            {word.split("").map((char, charIndex) => (
              <li key={`char-${wordIndex}-${charIndex}`} role="listitem">
                <MaskedQuoteTextItem char={char} revealed={revealed} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
