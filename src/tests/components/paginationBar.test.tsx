import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PaginationBar from "../../pages/homePage/paginationBar";

const mockOnPageButtonClick = vi.fn();

describe("PaginationBar", () => {
  it("should update url query string when page changes", async () => {
    const mockSetSearchParams = vi.fn();

    const TestComponent = () => {
      const [searchParams, setSearchParams] = useSearchParams();

      const handlePageChange = (page: number): void => {
        searchParams.set("page", String(page));
        setSearchParams(searchParams);
        mockSetSearchParams(searchParams);
      };

      return (
        <PaginationBar
          pagesCount={5}
          onPageButtonClick={handlePageChange}
          currentPage={Number(searchParams.get("page")) || 1}
        />
      );
    };

    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <TestComponent />
      </MemoryRouter>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });

    const user = userEvent.setup();
    await user.click(nextButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.any(URLSearchParams),
      );

      const updatedSearchParams = mockSetSearchParams?.mock
        ?.calls?.[0]?.[0] as URLSearchParams;
      expect(updatedSearchParams.get("page")).toBe("2");
    });
  });

  it("should disable prev button on the first page", () => {
    render(
      <PaginationBar
        pagesCount={5}
        onPageButtonClick={() => {}}
        currentPage={1}
      />,
    );

    const prevButton = screen.getByRole("button", { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button on the last page", () => {
    render(
      <PaginationBar
        pagesCount={5}
        onPageButtonClick={() => {}}
        currentPage={5}
      />,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it('should call the "onPageButtonClick" function when page button is clicked', async () => {
    render(
      <PaginationBar
        pagesCount={5}
        onPageButtonClick={mockOnPageButtonClick}
        currentPage={1}
      />,
    );

    const pageButton = screen.getByText("2");
    const user = userEvent.setup();
    await user.click(pageButton);
    expect(mockOnPageButtonClick).toHaveBeenCalledWith(2);
  });

  it('should call the "onPageButtonClick" function when prev button is clicked', async () => {
    render(
      <PaginationBar
        pagesCount={5}
        onPageButtonClick={mockOnPageButtonClick}
        currentPage={2}
      />,
    );

    const pageButton = screen.getByText(/prev/i);
    const user = userEvent.setup();
    await user.click(pageButton);
    expect(mockOnPageButtonClick).toHaveBeenCalledWith(1);
  });

  it('should call the "onPageButtonClick" function when next button is clicked', async () => {
    render(
      <PaginationBar
        pagesCount={5}
        onPageButtonClick={mockOnPageButtonClick}
        currentPage={1}
      />,
    );

    const pageButton = screen.getByText(/next/i);
    const user = userEvent.setup();
    await user.click(pageButton);
    expect(mockOnPageButtonClick).toHaveBeenCalledWith(2);
  });
});
