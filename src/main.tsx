import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout";
import ErrorBoundary from "./components/errorBoundary";
import CharactersPage from "./pages/charactersPage/charactersPage";
import NotFountPage from "./pages/notFountPage";
import Loader from "./components/ui/loader";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <CharactersPage />
        </ErrorBoundary>
      ),
    },
    {
      path: "*",
      element: <NotFountPage />,
    },
    {
      path: "about",
      element: <h1>About</h1>,
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
