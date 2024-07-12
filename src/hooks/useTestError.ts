import { useState } from "react";

export default function useTestError() {
  const [testError, setTestError] = useState<boolean>(false);

  if (testError) {
    throw new Error(
      "This is the test error to test error boundary functionality",
    );
  }

  return {
    testError,
    throwTestError: () => setTestError(true),
    resetError: () => setTestError(false),
  };
}
