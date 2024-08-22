import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Health Tracker heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Health Tracker/i);
  expect(headingElement).toBeInTheDocument();
});
