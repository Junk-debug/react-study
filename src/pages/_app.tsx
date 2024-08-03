import "@/styles/globals.css";
import type { AppProps } from "next/app";

import ErrorBoundary from "@/components/errorBoundary";
import Layout from "@/components/layout";
import ThemeProvider from "@/components/themeProvider";

import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
