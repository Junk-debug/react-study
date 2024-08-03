import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PaginationBar from "@/components/paginationBar";
import { useRouter } from "next/router";
import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";

const mockOnPageButtonClick = vi.fn();

describe("PaginationBar", () => {
  it("should update url query string when page changes", async () => {
    const mockRouter = createMockRouter({});

    const TestComponent = () => {
      const router = useRouter();

      const handlePageChange = (page: number): void => {
        router.push({ query: { page } });
      };

      return (
        <PaginationBar
          pagesCount={5}
          onPageButtonClick={handlePageChange}
          currentPage={1}
        />
      );
    };

    render(
      <RouterProvider router={mockRouter}>
        <TestComponent />
      </RouterProvider>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });

    const user = userEvent.setup();
    await user.click(nextButton);

    expect(mockRouter.push).toHaveBeenCalledWith({ query: { page: 2 } });
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
