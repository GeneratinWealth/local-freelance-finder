
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
