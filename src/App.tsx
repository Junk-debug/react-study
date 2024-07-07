import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import WithSearchLogic from "./searchPage/withSearchLogic";
import SearchPage from "./searchPage/searchPage";

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-screen bg-gray-100 text-zinc-800">
        <h1 className="text-6xl font-bold text-center pt-8">
          Rick and Morty characters
        </h1>
        <ErrorBoundary>
          <WithSearchLogic searchPage={SearchPage} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
