import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '40px',
          background: 'linear-gradient(135deg, #1c1d22 0%, #0a0b0e 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(139, 0, 0, 0.5)',
          color: '#f0f0f5',
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
          }}>
            ⚠️
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '24px',
            marginBottom: '12px',
            color: '#d4af37',
          }}>
            Une erreur est survenue
          </h2>
          <p style={{
            color: '#a0a0b0',
            marginBottom: '20px',
            maxWidth: '400px',
          }}>
            Le sort a mal tourné. La magie d'Aethelgard a subi une perturbation inattendue.
          </p>
          {this.state.error && (
            <details style={{
              background: 'rgba(0,0,0,0.3)',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              maxWidth: '500px',
              textAlign: 'left',
            }}>
              <summary style={{ cursor: 'pointer', color: '#a0a0b0' }}>
                Détails techniques
              </summary>
              <pre style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#ff6b6b',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleRetry}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #d4af37 0%, #8a6d3b 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#0a0b0e',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};
