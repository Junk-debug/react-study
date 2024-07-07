import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import WithSearchLogic from "./pages/charactersPage/withSearchLogic";
import CharacterPage from "./pages/charactersPage/charactersPage";

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-screen bg-gray-100 text-zinc-800">
        <ErrorBoundary>
          <WithSearchLogic charactersPage={CharacterPage} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
