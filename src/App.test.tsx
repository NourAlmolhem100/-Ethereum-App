import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import App from "./App";

jest.setTimeout(25000);
jest.mock("con3xetherfunc", () => ({
  getLastBlockNumber: jest.fn().mockResolvedValue(10),
  getUSDTBalance: jest.fn().mockResolvedValue("100"),
}));

describe("App Component", () => {
  it("fetches last block number successfully", async () => {
    render(<App />);

    const blockNumberButton = screen.getByText("Get Last Block Number");
    fireEvent.click(blockNumberButton);

    const userItem = await screen.findByText("Result:");

    expect(userItem).toBeInTheDocument();
  });
});
