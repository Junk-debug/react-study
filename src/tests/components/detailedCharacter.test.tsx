import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import DetailedCharacter from "@/components/detailedCharacter";
import store from "@/redux/store";
import mockCharacters from "../mocks/mockCharacters";
import createMockRouter, { RouterProvider } from "../mocks/createMockRouter";
import mockEpisode from "../mocks/mockEpisode";

const mockRouter = createMockRouter({});

const renderFn = () =>
  render(
    <Provider store={store}>
      <RouterProvider router={mockRouter}>
        <DetailedCharacter
          detailedCharacter={{
            character: mockCharacters[0],
            firstEpisodeName: mockEpisode.name,
          }}
        />
      </RouterProvider>
    </Provider>,
  );

describe("DetailedCharacter", () => {
  it("should correctly display the detailed card data", async () => {
    renderFn();

    expect(screen.getByText(mockCharacters[0].gender)).toHaveTextContent(
      mockCharacters[0].gender,
    );

    expect(screen.getByText(mockCharacters[0].location.name)).toHaveTextContent(
      mockCharacters[0].location.name,
    );

    expect(
      screen.getByText(mockCharacters[0].episode.length.toString()),
    ).toHaveTextContent(mockCharacters[0].episode.length.toString());
  });

  it("should hide component on click the close button", async () => {
    renderFn();

    const closeButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith({ query: {} }, undefined, {
      scroll: false,
    });
  });
});
