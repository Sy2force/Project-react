// [EXAM] Tests d'accessibilité
import { render, screen } from "@testing-library/react";
import SkipLinkExam from "../SkipLink.exam";
import { describe, it, expect } from "vitest";

describe("SkipLink", () => {
  it("renders link to main", () => {
    render(<SkipLinkExam />);
    expect(screen.getByText(/Aller au contenu/i)).toHaveAttribute("href", "#main");
  });

  it("has proper accessibility attributes", () => {
    render(<SkipLinkExam />);
    const link = screen.getByText(/Aller au contenu/i);
    expect(link).toHaveClass("sr-only");
    expect(link).toHaveClass("focus:not-sr-only");
  });
});
