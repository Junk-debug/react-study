import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "../../pages/homePage/searchBar";
import useLocalStorage from "../../hooks/useLocalStorage";

describe("SearchBar", () => {
  localStorage.clear();

  const localStorageSpy = vi.spyOn(Storage.prototype, "setItem");
  const localStorageGetSpy = vi.spyOn(Storage.prototype, "getItem");

  const mockHandleSearchChange = vi.fn();
  const mockHandleButtonClick = vi.fn();

  const localStorageKey = "test";
  const typedValue = "Rick";

  const TestComponent = () => {
    const [search, setSearch] = useLocalStorage(localStorageKey, "");
    return (
      <SearchBar
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          mockHandleSearchChange(e.target.value);
        }}
        onClick={mockHandleButtonClick}
      />
    );
  };

  it('should save entered value to localStorage on "search" button click', async () => {
    render(<TestComponent />);

    const searchInput = screen.getByRole("textbox");

    const user = userEvent.setup();
    await user.type(searchInput, typedValue);

    expect(localStorageSpy).toHaveBeenCalledWith(localStorageKey, typedValue);
  });

  it("should get saved value on component mount", () => {
    render(<TestComponent />);

    const searchInput = screen.getByRole("textbox");

    expect(localStorageGetSpy).toHaveBeenCalledWith(localStorageKey);
    expect(searchInput).toHaveValue(typedValue);
  });
});
