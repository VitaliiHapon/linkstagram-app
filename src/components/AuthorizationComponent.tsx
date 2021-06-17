import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { authApi } from "../adapters/auth";
import '../css/authorization.css';
import '../css/common.css';
import i18n from "../utils/i18n";
import InputField from "./InputField";

export const logIn = 'log-in';
export const signUp = 'sign-up';



interface IAuthorizationProps {
    authorizationType: string
}

class AuthorizationComponent extends React.Component<IAuthorizationProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user_name: '',
            auth_text: this.props.authorizationType === logIn
                ? i18n.t('authorization.log_in')
                : i18n.t('authorization.sign_up'),

            email_err: null,
            password_err: null,
            user_name_err: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        this.setState({ email_err: null, password_err: null });
        if (this.props.authorizationType === logIn) {
            authApi.logIn({
                login: this.state.email,
                password: this.state.password
            },
                (f, err) => {
                    if (f == "login")
                        this.setState({ email_err: err });
                    else if (f == "password")
                        this.setState({ password_err: err });
                });
        }
        else {
            authApi.signUp({
                login: this.state.email,
                username: this.state.user_name,
                password: this.state.password,
            }, (f, err) => {
                if (f == "login")
                    this.setState({ email_err: err });
                else if (f == "password")
                    this.setState({ password_err: err });
            })
        }

        event.preventDefault();
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {

        return (
            <div>

                <div className={isMobile ? 'authorization-header-mobile' : 'authorization-header-desktop'}>
                    {this.state.auth_text}
                </div>

                <form onSubmit={this.handleSubmit}>
                <InputField
                        error={this.state.email_err}
                        height={48}
                        label={i18n.t('authorization.email')}
                        name="email"
                        placeholder={i18n.t('authorization.email_placeholder')}
                        value={this.state.email}
                        onChange={this.handleChange}
                        validation={this.state.email_err != null? false: null}
                        type="text" />
                    
                  
                    <div className="form-field-user-name">
                        {this.props.authorizationType == signUp
                            ?
                            <InputField
                                error={this.state.user_name_err}
                                height={48}
                                label={i18n.t('authorization.user_name')}
                                name="user_name"
                                placeholder={i18n.t('authorization.user_name_placeholder')}
                                value={this.state.user_name}
                                onChange={this.handleChange}
                                validation={this.state.user_name_err != null? false: null}
                                type="text" />
                            : ""}
                    </div>


                    <InputField
                        error={this.state.password_err}
                        height={48}
                        label={i18n.t('authorization.password')}
                        name="password"
                        placeholder={i18n.t('authorization.password_placeholder')}
                        value={this.state.password}
                        onChange={this.handleChange}
                        validation={this.state.password_err != null? false: null}
                        type="password" />


                    <div className={isMobile ? "auth-button-section-mobile" : ""}>
                        {!isMobile ? <input type="submit" value={this.state.auth_text} style={{ height: 48 }} className="blue-button blue-button-desktop"></input> : ""}

                        <div className={"auth-question" + (isMobile ? " auth-question-mobile" : "")}>
                            <span className="auth-question-text">
                                {i18n.t(this.props.authorizationType == logIn ? 'authorization.dont_have_account' : 'authorization.have_account')}</span>
                            <span className="auth-question-link">
                                <Link className="auth-link" to={this.props.authorizationType === logIn ? "/signup" : "/login"}>{i18n.t(this.props.authorizationType == logIn ? 'authorization.sign_up' : 'authorization.log_in')}</Link>
                            </span>
                        </div>
                        {isMobile ? <input type="submit" value={this.state.auth_text} style={{ height: 48 }} className="blue-button"></input> : ""}


                    </div>

                </form>

            </div>

        );
    }
}



export default AuthorizationComponent;