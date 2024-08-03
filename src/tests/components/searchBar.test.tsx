import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "@/components/searchBar";
import { useState } from "react";
import { useRouter } from "next/router";
import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";

describe("SearchBar", () => {
  const TestComponent = () => {
    const router = useRouter();
    const initialSearch = Array.isArray(router.query.search)
      ? ""
      : router.query.search || "";
    const [search, setSearch] = useState(initialSearch);

    return (
      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onClick={() => router.push({ query: { search } })}
      />
    );
  };

  const typedValue = "Rick";

  it('should save entered value to query params in url on "search" button click', async () => {
    const router = createMockRouter({});

    render(
      <RouterProvider router={router}>
        <TestComponent />
      </RouterProvider>,
    );

    const searchInput = screen.getByRole("textbox");

    const user = userEvent.setup();
    await user.type(searchInput, typedValue);

    const searchButton = screen.getByRole("button");
    await user.click(searchButton);

    expect(router.push).toHaveBeenCalledWith({ query: { search: typedValue } });
  });

  it("should get saved value on component mount", () => {
    const router = createMockRouter({ query: { search: typedValue } });
    render(
      <RouterProvider router={router}>
        <TestComponent />
      </RouterProvider>,
    );

    const searchInput = screen.getByRole("textbox");

    expect(searchInput).toHaveValue(typedValue);
  });
});
