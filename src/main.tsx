import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout";
import ErrorBoundary from "./components/errorBoundary";
import HomePage from "./pages/homePage/homePage";
import NotFountPage from "./pages/notFountPage";
import Loader from "./components/ui/loader";
import CharacterPage from "./pages/characterPage/characterPage";

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
          element: <CharacterPage />,
        },
      ],
    },
  ],
  { basename: "/react-study/" },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider
        router={router}
        fallbackElement={<Loader className="w-11 h-11" />}
      />
    </Layout>
  </React.StrictMode>,
);
