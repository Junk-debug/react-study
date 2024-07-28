import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { it, expect, describe, vi, beforeAll } from "vitest";
import userEvent from "@testing-library/user-event";
import Flyout from "../../pages/homePage/flyout";
import { setupStore } from "../../app/store";
import mockCharacters from "../mocks/mockCharacters";

describe("Flyout", () => {
  const store = setupStore({
    selectedCharacters: {
      selectedCharacters: { ids: [1], entities: { 1: mockCharacters[0] } },
    },
  });

  const renderFn = () =>
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => "mockedObjectURL");
  });

  it("should show the flyout if there are selected characters", () => {
    renderFn();

    expect(screen.getByTestId("flyout")).toBeInTheDocument();
  });

  it('should clear store on "Unselect all" button click', async () => {
    renderFn();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /unselect all/i }));

    expect(store.getState().selectedCharacters.selectedCharacters.ids).toEqual(
      [],
    );
  });
});
