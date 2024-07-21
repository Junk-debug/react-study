import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout";
import ErrorBoundary from "./components/errorBoundary";
import HomePage from "./pages/homePage/homePage";
import NotFountPage from "./pages/notFountPage";
import Loader from "./components/ui/loader";
import DetailedCharacter from "./pages/detailedCharacter/detailedCharacter";
import ThemeProvider from "./components/themeProvider";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <NotFountPage />,
      element: (
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      ),
      children: [
        {
          path: "/character/:id",
          element: <DetailedCharacter />,
        },
      ],
    },
  ],
  { basename: "/react-study/" },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Layout>
        <RouterProvider
          router={router}
          fallbackElement={<Loader className="w-11 h-11" />}
        />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>,
);
