import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    // Reset the error state and reload the page
    window.location.reload();
  };

  handleReset = () => {
    // Just reset the error state to try rendering again
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-twitter-darker flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 w-full max-w-md text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-twitter-white mb-4">
              Something went wrong
            </h1>
            
            <p className="text-twitter-lightGray mb-6">
              We encountered an unexpected error. This might be due to wallet connectivity issues.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-gradient-to-r from-twitter-blue to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full glass hover:bg-twitter-surface text-twitter-lightGray font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Reload Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-twitter-lightGray text-sm cursor-pointer hover:text-twitter-white">
                  Error Details (Development)
                </summary>
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-mono overflow-auto max-h-48">
                  <pre>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
