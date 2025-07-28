import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
          <div className="text-center p-8">
            <h2 className="text-white text-2xl font-bold mb-4">
              Something went wrong.
            </h2>
            <p className="text-secondary mb-4">
              We&apos;re sorry, but something unexpected happened.
            </p>
            <button
              className="bg-[#915EFF] hover:bg-[#915EFF]/80 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
