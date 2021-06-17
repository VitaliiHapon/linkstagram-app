import React from "react";
import '../css/nav-bar.css';

type ErrorLabelData = {
    msg: string | null;
}
class ErrorLabelComponent extends React.Component<ErrorLabelData> {

    render() {
        return (
            (this.props.msg != null) ? <span className="error-label">
                {this.props.msg}
            </span> : null
        );
    }
}

export default ErrorLabelComponent;