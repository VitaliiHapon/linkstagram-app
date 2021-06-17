import React from "react";
import '../css/common.css';
import '../css/nav-bar.css';
import ErrorLabelComponent from "./ErrorLabelComponent";

type InputFieldProps = {
    label: string,
    name: string,
    placeholder: string,
    height: Number | null
    value: any,
    onChange: any,
    error: string | null,
    validation: boolean | null,
    type: string

}

class InputField extends React.Component<InputFieldProps, any> {

    render() {
        return (
            <div className="common-form-field">
                <label >
                    <div className="common-form-label">
                        {this.props.label}
                    </div>
                    <div className="common-form-input-container">
                        <input
                            className="common-form-input"
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            style={{ height: (this.props.height ?? 48) as number }}
                            value={this.props.value}

                            type={this.props.type}
                            onChange={this.props.onChange} />
                        {this.props.validation != null
                            ? (
                                this.props.validation == true
                                    ?
                                    <div className="form-validation-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="8" fill="#01DC31" />
                                            <path d="M5 8.24261L7.12132 10.3639L11.364 6.12129" stroke="white" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    :
                                    <div className="form-validation-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="8" fill="#FB766E" />
                                            <path d="M10.1213 5.87871L8 8.00003M5.87868 10.1213L8 8.00003M8 8.00003L5.87868 5.87871M8 8.00003L10.1213 10.1213" stroke="white" stroke-width="1.125" stroke-linecap="round" />
                                        </svg>
                                    </div>
                            )
                            : ""}
                    </div>
                </label>
                <ErrorLabelComponent msg={this.props.error} />
            </div>
        );
    }
}



export default InputField;