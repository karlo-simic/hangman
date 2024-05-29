import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MaskedQuoteText } from "./masked-quote-text";

describe("MaskedQuoteText Component", () => {
  it("renders the list of all words", () => {
    const baseText = "Hello World";
    const revealedChars = new Set<string>();

    render(<MaskedQuoteText base={baseText} revealed={revealedChars} />);

    const maskedQuote = screen.getByRole("list", { name: /masked quote/i });
    expect(maskedQuote).toBeInTheDocument();
  });

  it("renders the correct number of words", () => {
    const baseText = "Hello World";
    const revealedChars = new Set<string>();

    render(<MaskedQuoteText base={baseText} revealed={revealedChars} />);

    const wordItems = screen.getAllByRole("listitem", { name: /word \d+/i });
    expect(wordItems.length).toBe(2); // "Hello" and "World"
  });

  it("renders the correct number of letters", () => {
    const baseText = "Hello World";
    const revealedChars = new Set<string>();

    render(<MaskedQuoteText base={baseText} revealed={revealedChars} />);

    const characterItems = screen.getAllByTestId("masked-quote-character");
    expect(characterItems.length).toBe(baseText.replace(" ", "").length);
  });

  it("renders with hidden characters having correct aria-labels", () => {
    const baseText = "Hello World";
    const revealedChars = new Set<string>();

    render(<MaskedQuoteText base={baseText} revealed={revealedChars} />);

    const hiddenChars = screen.getAllByLabelText("Hidden character");
    expect(hiddenChars.length).toBe(10); // 7 hidden characters in "Hello World"
  });

  it("renders revealed characters correctly", () => {
    const baseText = "Hello World";
    const revealedChars = new Set<string>(["h", "e", "w"]);

    render(<MaskedQuoteText base={baseText} revealed={revealedChars} />);

    revealedChars.forEach((char) => {
      const displayedChar = screen.getByText(new RegExp(char, "i"));
      expect(displayedChar).toBeInTheDocument();
    });
  });
});
