import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode;
}
interface State {
    hasError: boolean;
    errorMessage: string;
    errorInfo: string;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        errorMessage: '',
        errorInfo: ''
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ hasError: true, errorMessage: error.toString(), errorInfo: errorInfo.componentStack });
    }

    render() {
        if (this.state.hasError) {
            return <div>
                <summary>Something went wrong</summary>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.errorMessage}
                    {this.state.errorInfo}
                </details>
            </div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
