import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import App from "./App";

jest.mock("con3xetherfunc", () => ({
  getLastBlockNumber: jest.fn().mockResolvedValue(10),
  getUSDTBalance: jest.fn().mockResolvedValue("100"),
}));

describe("App Component", () => {
  it("fetches last block number successfully", async () => {
    render(<App />);

    const blockNumberButton = screen.getByTestId("blockNumberButton");
    fireEvent.click(blockNumberButton);

    await waitFor(() =>
      expect(screen.findByTestId("blockNumber")).toBeInTheDocument()
    );
  });

  it("fetches USDT balance successfully", async () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    const addressInput = getByPlaceholderText("Enter address");
    fireEvent.change(addressInput, { target: { value: "0xtestaddress" } });

    const balanceButton = getByText("Get USDT Balance");
    fireEvent.click(balanceButton);

    await waitFor(() =>
      expect(screen.findByTestId("USDTBalance")).toBeInTheDocument()
    );
  });

  it("displays loading spinner", async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText("Get Last Block Number"));

    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
