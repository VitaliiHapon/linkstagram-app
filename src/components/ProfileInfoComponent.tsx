import React from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { profilesApi } from '../adapters/profiles';
import '../css/common.css';
import '../css/profile-info.css';
import { getUsername } from "../utils/auth";
import i18n from "../utils/i18n";
import { formatFollowers } from "../utils/utils";
import AvatarIcon from "./AvatarIcon";



type ProfileInfoProps = {
    userName?: string;
    onOpenProfileEdit?: () => void;
    onOpenNewPostModal?: () => void;
}

class ProfileInfo extends React.Component<ProfileInfoProps | any, { accountInfo: profilesApi.AccountInfo, imgUrl: string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            accountInfo: {},
            imgUrl: ''
         }

    }

    componentDidMount() {
        if (this.props.userName === undefined) {

            profilesApi.getAccount((x) => {
                console.log(x.profile_photo_url);
                this.setState({
                    accountInfo: x,
                    imgUrl: x.profile_photo_url ?? ""
                });
            });
        }
        else {

            profilesApi.getProfile(this.props.userName, (x) => {
                console.log(x.profile_photo_url);
                this.setState({
                    accountInfo: x,
                    imgUrl: x.profile_photo_url
                });
            })

        }
    }

    renderButtons() {
        if (this.state.accountInfo.username !== getUsername())
            return null;
        else
            return (<div className="profile-info-buttons">
                <div className={isMobile ? "profile-info-buttons-container-grid" : "profile-info-buttons-container-table"}>
                    <span>
                    <MobileView>
                        <Link to="/new-post">
                            <button style={{ height: 40, width: isMobile ? "" : 104 }} className="white-button profile-info-new-post-button"> {i18n.t("profile.new_post")} </button>
                        </Link>
                        </MobileView>
                        <BrowserView>
                            <button onClick={this.props.onOpenNewPostModal} style={{ height: 40, width: isMobile ? "" : 104 }} className="white-button profile-info-new-post-button"> {i18n.t("profile.new_post")} </button>
                        </BrowserView>
                    </span>
                    <span>
                        <MobileView>
                            <Link to="/profile-edit">
                                <button style={{ height: 40, width: isMobile ? "" : 104 }} className="blue-button profile-info-edit-profile-button"> {i18n.t("profile.edit_profile")} </button>
                            </Link>
                        </MobileView>
                        <BrowserView>
                            <button onClick={this.props.onOpenProfileEdit} style={{ height: 40, width: isMobile ? "" : 104 }} className="blue-button profile-info-edit-profile-button"> {i18n.t("profile.edit_profile")} </button>
                        </BrowserView>
                    </span>


                </div>
            </div>)
    }


    render() {

        return (

            <div key={this.state.accountInfo.username} className="profile-info-container">
                <div className="profile-info-upper-container">
                    <span>
                        <div className="profile-info-follow-count">
                            {formatFollowers(this.state.accountInfo['followers'] as number) ?? "..."}
                        </div>
                        <div className="profile-info-follow">
                            {i18n.t("profile.followers")}
                        </div>
                    </span>
                    <span className="profile-info-avatar" >
                        <AvatarIcon link={"/profile/" + this.state.accountInfo.username} size={88} imageUrl={this.state.accountInfo.profile_photo_url ?? null} active={true}></AvatarIcon>
                    </span>
                    <span>
                        <div className="profile-info-follow-count">
                            {formatFollowers(this.state.accountInfo['following'] as number) ?? "..."}
                        </div>
                        <div className="profile-info-follow">
                            {i18n.t("profile.following")}
                        </div>
                    </span>
                </div>
                <div className="profile-info-lower-container">
                    <div className="profile-info-title-row">
                        <span className="profile-info-title">
                            {this.state.accountInfo['first_name'] ?? this.state.accountInfo['username']}
                            {" "}
                            {this.state.accountInfo['last_name'] ?? ""}
                        </span>
                        <span className="profile-info-dash">
                            -
                        </span>
                        <span className="profile-info-title">
                            {this.state.accountInfo['job_title'] ?? "No job"}
                        </span>
                    </div>
                    <div className="profile-info-description">
                        {this.state.accountInfo['description'] ?? "No description"}
                    </div>

                    {this.renderButtons()}

                </div>
            </div>
        );
    }
}

export default ProfileInfo;
