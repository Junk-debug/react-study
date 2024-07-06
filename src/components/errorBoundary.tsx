import { Component, ComponentType } from "react";
import Button from "./ui/button";

export interface FallbackProps {
  error: Error;
  reset: () => void;
}

interface Props {
  children: React.ReactNode;
  onReset?: () => void;
  fallback?: ComponentType<FallbackProps>;
}

type State = {
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => {
    const { onReset } = this.props;

    this.setState({ error: null });
    if (onReset) {
      onReset();
    }
  };

  render() {
    const { error } = this.state;
    const { children, fallback: FallbackComponent } = this.props;
    if (error) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} reset={this.reset} />;
      }

      return (
        <div className="flex flex-col items-center h-screen justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-32 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <h1 className="text-center text-4xl font-semibold mb-4">
            Something went wrong!
          </h1>

          <p className="text-xl mb-4">{error.message}</p>

          <Button onClick={this.reset}>Try again</Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
