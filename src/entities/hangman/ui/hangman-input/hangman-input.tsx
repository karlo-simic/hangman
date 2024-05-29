import { Button } from "@/shared/ui";

interface HangmanInputProps {
  selected: Set<string>;
  onSelect: (letter: string) => void;
}

// prettier-ignore
const ALPHABET = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

export const HangmanInput = ({ selected, onSelect }: HangmanInputProps) => {
  return (
    <ul className="flex flex-wrap gap-1 justify-center max-w-[42rem]">
      {ALPHABET.map((letter) => (
        <li key={letter}>
          <Button
            className="uppercase"
            disabled={selected.has(letter)}
            onClick={() => onSelect(letter)}
          >
            {letter}
          </Button>
        </li>
      ))}
    </ul>
  );
};
