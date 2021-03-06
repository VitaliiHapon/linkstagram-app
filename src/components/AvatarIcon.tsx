import { link } from "fs";
import React from "react";
import { Link } from "react-router-dom";
import '../css/nav-bar.css';
import { imageUrlOrDefault } from "../utils/utils";


type AvatarIconData = {
    imageUrl: string | null;
    link?: string,
    size: Number;
    active: boolean;
}
class AvatarIcon extends React.Component<AvatarIconData, any> {
    imageUrl = imageUrlOrDefault(this.props.imageUrl);
    constructor(props: any) {
        super(props);
        this.state = {
            imageUrl: '',
            notLoaded: true
        }
    }

    componentDidMount() {
        this.setState({
            imageUrl: imageUrlOrDefault(this.props.imageUrl),
            notLoaded: false
        })
    }

    renderAvatar() {
        if(this.state.notLoaded)
            return null;
        return (
            <div style={{ width: this.props.size as number, height: this.props.size as number, cursor: (this.props.link != null ? "pointer" : "unset") }} className="common-avatar-icon-container">
                <img
                    style={{ width: this.props.size as number, height: this.props.size as number }}
                    className="common-avatar-icon"
                    src={this.imageUrl}></img>
                {this.props.active ?


                    <div className="common-avatar-frame" >
                        <svg style={{ width: this.props.size as number, height: this.props.size as number }} width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="86" height="86" rx="23" stroke="url(#paint0_linear)" stroke-width="2" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="0" y1="88" x2="88" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#74EDF2" />
                                    <stop offset="1" stop-color="#5156E6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    : null
                }
            </div>
        );
    }

    render() {
        if (this.props.link != undefined)
            return (
                <div onClick={() => window.location.reload()}>
                    <Link to={this.props.link ?? ""}  >
                        {this.renderAvatar()}
                    </Link>
                </div>
            )
        else
            return this.renderAvatar()
    }
}

export default AvatarIcon;
