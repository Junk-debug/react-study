import { Component } from "react";
import Button from "./ui/button";

interface Props {
  children: React.ReactNode;
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

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Error: {error.message}</p>
          <Button onClick={this.resetError}>Try again</Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
