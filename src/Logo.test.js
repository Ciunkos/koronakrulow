import React from "react";
import { render } from "@testing-library/react";

import Logo from "./Logo";

test("renders the title as the page heading by default", () => {
  const { container } = render(<Logo />);
  const headings = container.querySelectorAll("h1");
  expect(headings).toHaveLength(1);
  expect(headings[0].textContent).toBe("Korona Krulów");
});

test("renders no heading when heading is false", () => {
  const { container, getByText } = render(<Logo heading={false} />);
  expect(container.querySelectorAll("h1, h2, h3, h4, h5, h6")).toHaveLength(0);
  expect(getByText("Korona Krulów")).toBeTruthy();
});
