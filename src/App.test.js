import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders App component without crashing", () => {
  render(<App />);
});

test("renders HomePage and AboutPage routes", () => {
  render(<App />);

  const homeRoute = screen.getByRole("link", { name: /home/i });
  expect(homeRoute).toBeInTheDocument();

  const aboutRoute = screen.getByRole("link", { name: /about/i });
  expect(aboutRoute).toBeInTheDocument();
});
