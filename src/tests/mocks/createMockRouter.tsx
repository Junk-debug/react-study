/* eslint-disable import/no-extraneous-dependencies */
import { NextRouter } from "next/router";
import { vi } from "vitest";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";

export default function createMockRouter(
  router: Partial<NextRouter>,
): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    forward: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    locale: "en",
    locales: ["en"],
    ...router,
  };
}

export const RouterProvider = ({
  children,
  router,
}: {
  children: React.ReactNode;
  router: NextRouter;
}) => {
  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};
