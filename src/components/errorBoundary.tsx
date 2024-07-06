import { Component, ComponentType } from "react";
import Button from "./ui/button";

interface Props {
  children: React.ReactNode;
  onReset?: () => void;
  fallback?: ComponentType<{ error: Error; reset: () => void }>;
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
        // TODO: design default fallback
        <div>
          <h1>Something went wrong.</h1>
          <p>Error: {error.message}</p>
          <Button onClick={this.reset}>Try again</Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
