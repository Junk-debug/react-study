import { PureComponent } from "react";
import ErrorBoundary from "./components/errorBoundary";
import Search from "./search/search";
import Button from "./components/ui/button";

function FallbackComponent({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  return (
    <div>
      <h1 className="text-red-500 text-3xl">Error</h1>
      <p>Something went wrong.</p>
      <p>{error?.message}</p>
      {reset && <Button onClick={() => reset()}>Try again</Button>}
    </div>
  );
}

class App extends PureComponent {
  render() {
    return (
      <main className="min-h-dvh bg-gray-100 text-zinc-800">
        <ErrorBoundary fallback={FallbackComponent}>
          <Search />
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
