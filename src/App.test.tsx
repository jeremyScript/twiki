import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("Submit button makes string content in 'code-cell' to appear in 'result-cell' on click", () => {
  render(<App />);

  const codeCell = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  const resultCell = screen.getByText(/>>/i);

  const codeCellContent = codeCell.textContent;

  userEvent.click(submitButton);
  expect(resultCell).toHaveTextContent(">> " + codeCellContent);
});
