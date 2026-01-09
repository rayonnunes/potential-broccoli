import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@testing-library/jest-dom";

import App from "./App";

describe("App Transaction test", () => {
  it("displays fields", () => {
    render(<App />);

    const amountInput = screen.getByTestId("amount-input");
    const descriptionInput = screen.getByTestId("description-input");

    expect(amountInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    fireEvent.change(amountInput, { target: { value: "10" } });
    fireEvent.change(descriptionInput, { target: { value: "book" } });

    expect(amountInput).toHaveValue(10);
    expect(descriptionInput).toHaveValue("book");
  });
});
