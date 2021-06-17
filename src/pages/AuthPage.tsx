import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import AuthorizationComponent, { logIn } from "../components/AuthorizationComponent";
import NavBarComponent from "../components/NavBarComponent";
import '../css/authorization.css'
import '../css/auth-page.css'

export { }

class AuthPage extends React.Component<any>{
    render() {
        return (
            <div>
                <MobileView>
                    <div style={{ margin: 16 }}>
                        <AuthorizationComponent authorizationType={this.props.authType}></AuthorizationComponent>
                    </div>
                </MobileView>

                <BrowserView>
                    <div className="auth-page-container">
                        <div className="auth-flex-container">
                            <div className="phone-box-desktop">
                                {this.props.authType == logIn
                                    ? <div>
                                        <div className="phone-box-image-1L"></div>
                                        <div className="phone-box-image-2L"></div>
                                        <div className="phone-box-image-3L"></div>
                                    </div>
                                    : <div>
                                        <div className="phone-box-image-1S"></div>
                                        <div className="phone-box-image-2S"></div>
                                        <div className="phone-box-image-3S"></div>
                                    </div>}
                                <div className="phone-box-background">

                                </div>
                            </div>

                            <div className="auth-box-desktop">
                                <AuthorizationComponent authorizationType={this.props.authType}></AuthorizationComponent>
                            </div>
                        </div>
                    </div>
                </BrowserView>

            </div>
        )
    }
}

export default AuthPage;