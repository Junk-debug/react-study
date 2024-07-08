import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import CharactersPage from "./pages/charactersPage/charactersPage";

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-screen bg-gray-100 text-zinc-800">
        <ErrorBoundary>
          <CharactersPage />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
