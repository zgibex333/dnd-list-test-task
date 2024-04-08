import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ListWithControls } from "./List";
import { useGetQuotesQuery } from "../../store/slice";
import { mockQuote } from "../../utils/mocks";

const mockStore = configureStore({
  reducer: () => {},
});

const mockQuotesData: Quote[] = Array.from(Array(100)).map(() => ({
  ...mockQuote,
  companyName: String(Math.random()),
}));

jest.mock("../../store/slice", () => ({
  ...jest.requireActual("../../store/slice"),
  useGetQuotesQuery: jest.fn(),
}));

const mockUseGetQuotesQuery = useGetQuotesQuery as jest.Mock;

const renderComponent = () => {
  render(
    <Provider store={mockStore}>
      <ListWithControls />
    </Provider>
  );
};

describe("List component", () => {
  it("shows loading when fetching data", () => {
    mockUseGetQuotesQuery.mockReturnValue({ isLoading: true });
    renderComponent();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("shows error when has fetching error", () => {
    mockUseGetQuotesQuery.mockReturnValue({ isError: true });
    renderComponent();
    expect(screen.getByText("Error...")).toBeInTheDocument();
  });
  it("shows list with correct length when has fetched data: 1000 items", () => {
    mockUseGetQuotesQuery.mockReturnValue({ data: mockQuotesData });
    renderComponent();
    expect(screen.getAllByTestId("tableRowDataTestId")).toHaveLength(10);
  });
  it("shows list with correct length when has fetched data: 1 item", () => {
    mockUseGetQuotesQuery.mockReturnValue({ data: [mockQuote] });
    renderComponent();
    expect(screen.getAllByTestId("tableRowDataTestId")).toHaveLength(1);
  });
});
