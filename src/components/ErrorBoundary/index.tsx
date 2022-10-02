import React from "react";
import { ReactComponent as DisconnectIcon } from "../../assets/images/disconnect.svg";
import ErrorStyles from "./ErrorBoundary.module.scss";

class ErrorBoundary extends React.Component<
  { children: any },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={ErrorStyles.error}>
          <div className={ErrorStyles.error_wrapper}>
            <DisconnectIcon className={ErrorStyles.error_wrapper_icon} />

            <h1 className={ErrorStyles.error_wrapper_headtext}>
              Oops! An intern pulled a plug
            </h1>
            <p
              className={ErrorStyles.error_wrapper_subtext}
              onClick={() => window.location.reload()}
            >
              Reload
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
