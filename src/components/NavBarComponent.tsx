import { throws } from "assert";
import React from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Link, withRouter } from "react-router-dom";
import { profilesApi } from "../adapters/profiles";
import '../css/nav-bar.css';
import { checkLoginToken } from "../utils/auth";
import i18n, { languages, saveLanguage } from "../utils/i18n";
import AvatarIcon from "./AvatarIcon";
import DropDownSelect from "./DropDownSelect";

type NavBarProps = {
    match: any
    location: any
    history: any
}

class NavBarComponent extends React.Component<NavBarProps, any> {



    constructor(props: any) {
        super(props)
        this.state = {
            label_logo_style:
                isMobile ? 'logo-label-mobile' : (isTablet ? 'logo-label-tablet' : 'logo-label-desktop'),
            height: isMobile ? 64 : 88,
            avatarUrl: null,
            topOffset: (isMobile ? 64 : 88) / 2 - 24,
            atHome: false
        }

        profilesApi.getAccount((x) => {
            this.setState({
                avatarUrl: x.profile_photo_url
            })
        });

    }

    renderAvatar(right: number) {
        return (
            <div className="nav-bar-avatar" style={{ top: this.state.topOffset, right: right }}>
                <Link to="/profile">
                    <AvatarIcon imageUrl={this.state.avatarUrl} size={40} active={false} />
                </Link>
            </div>
        )
    }

    renderHome() {
        return (
            <Link to="/" >
                <button className={(isMobile ? "light-white-button" : "black-button") + " nav-bar-home-button"}
                    style={{ top: this.state.topOffset, right: isMobile ? 16 : 200 - 24 }}>
                    {i18n.t('authorization.home')}
                </button>
            </Link>
        );
    }

    renderMobileButtons() {
        if (!isMobile)
            return null;

        return (checkLoginToken() ?
            <div>
                {this.props.location.pathname === "/"
                    ? this.renderAvatar(16)
                    : this.renderHome()
                }
            </div>
            : null
        );
    }

    renderDesktopButtons() {
        if (isMobile)
            return null;
        return (checkLoginToken() ?
            <div>
                {this.renderAvatar(64)}
                {this.renderHome()}
            </div>
            : null
        );
    }

    renderLogoutButton() {
        if (!isMobile)
            return null;

        return (checkLoginToken() ?

            <div>
                <Link to="/logout" >
                    <button className="red-white-button nav-bar-home-button"
                        style={{ top: this.state.topOffset, right: 16 }}>
                        {i18n.t('authorization.log_out')}
                    </button>
                </Link>
            </div>
            : null
        );
    }

    renderLanguageSelect() {
        if (isMobile)
            return null;
        return (
            <div className="nav-bar-lang-select"
                style={{ top: this.state.topOffset, right: (checkLoginToken() ? 120 : 64) - 12, display: isTablet ? "none" : "block" }}>
                <DropDownSelect offset={18} selectedItem={i18n.language} itemSelected={x => { i18n.changeLanguage(x) }} options={languages} />
            </div>)

    }

    renderButtons() {
        if (this.props.location.pathname === "/profile-edit")
            return this.renderLogoutButton();
        else
            return (
                <div>{this.renderMobileButtons()}
                    {this.renderDesktopButtons()}
                    {this.renderLanguageSelect()}
                </div>
            )
    }

    render() {
        return (
            <div>
                <div style={{ height: this.state.height }}></div>
                <div className="nav-bar-background" style={{ maxHeight: this.state.height }}>
                    <div className={this.state.label_logo_style + " logo-label"}>
                        Linkstagram
                    </div>

                    {this.renderButtons()}


                </div>


            </div>
        );
    }
}
i18n.on('languageChanged', function (lng) {
    saveLanguage(lng)
    document.location.reload();
})


export default withRouter(NavBarComponent);