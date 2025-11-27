import React from "react";

type State = { hasError: boolean; error?: Error | null; info?: any };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // log to console (also could send to remote logging)
    console.error("Uncaught error:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1 style={{ color: "#b91c1c" }}>Something went wrong</h1>
          <pre style={{ whiteSpace: "pre-wrap", color: "#111" }}>
            {this.state.error?.message}
          </pre>
          {this.state.info?.componentStack && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
              <summary>Stack trace</summary>
              <code>{this.state.info.componentStack}</code>
            </details>
          )}
          <div style={{ marginTop: 12 }}>
            <button onClick={() => location.reload()}>Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
