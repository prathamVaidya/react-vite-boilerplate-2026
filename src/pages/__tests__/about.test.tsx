import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutPage } from "../about";

describe("AboutPage", () => {
  it("renders page text", () => {
    render(<AboutPage />);

    expect(screen.getByText("Hello from About!")).toBeTruthy();
  });
});
