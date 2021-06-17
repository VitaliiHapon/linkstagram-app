import React from "react";

import '../css/common.css';
import '../css/profile-info.css';

import { profilesApi } from '../adapters/profiles'
import { formatFollowers } from "../utils/utils";
import AvatarIcon from "./AvatarIcon";
import i18n from "../utils/i18n";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Modal from "./Modal";
import PostComponent from "./PostComponent";
import { getUsername } from "../utils/auth";
import PostModal from "./PostModal";

type ProfileInfoProps = {
    userName?: string
}

class ProfileInfo extends React.Component<ProfileInfoProps, { accountInfo: profilesApi.AccountInfo, visible: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            accountInfo: {},
            visible: false
        }
        if (this.props.userName == undefined) {
            profilesApi.getAccount((x) => {
                this.setState({
                    accountInfo: x
                });
            });
        }
        else {
            profilesApi.getProfile(this.props.userName, (x) => {
                this.setState({
                    accountInfo: x
                });
            })
        }
    }

    renderButtons() {
        if (this.state.accountInfo.username != getUsername())
            return null;
        else
            return (<div className="profile-info-buttons">
                <div className={isMobile ? "profile-info-buttons-container-grid" : "profile-info-buttons-container-table"}>
                    <Link to="/new-post">
                        <button style={{ height: 40, width: isMobile ? "" : 104 }} className="white-button profile-info-new-post-button"> {i18n.t("profile.new_post")} </button>
                    </Link>
                    <Link to="/profile-edit">
                        <button style={{ height: 40, width: isMobile ? "" : 104 }} className="blue-button profile-info-edit-profile-button"> {i18n.t("profile.edit_profile")} </button>
                    </Link>
                </div>
            </div>)
    }

    render() {
        return (

            <div className="profile-info-container">
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
                        <AvatarIcon link={"/profile/" + this.state.accountInfo.username} size={88} imageUrl={this.state.accountInfo['profile_photo_url'] as string | null} active={true}></AvatarIcon>
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
