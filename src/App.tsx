import ErrorBoundary from "./components/errorBoundary";
import CharactersPage from "./pages/charactersPage/charactersPage";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 text-zinc-800">
      <ErrorBoundary>
        <CharactersPage />
      </ErrorBoundary>
    </main>
  );
}

export default App;
