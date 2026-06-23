import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <pre id="boot-error" style={{ padding: 24, color: '#b00', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 13 }}>
          {String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error))}
        </pre>
      );
    }
    return this.props.children;
  }
}
