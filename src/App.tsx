import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import Search from "./search/search";

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-screen bg-gray-100 text-zinc-800">
        <h1 className="text-6xl font-bold text-center pt-8">
          Rick and Morty characters
        </h1>
        <ErrorBoundary>
          <Search />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
