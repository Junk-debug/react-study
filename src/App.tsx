import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import Search from "./search/search";

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-dvh bg-gray-100 text-zinc-800">
        <ErrorBoundary>
          <Search />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
