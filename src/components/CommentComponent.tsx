import React from "react";
import { api } from "../adapters/post";
import { timeSince } from "../utils/time-utils";
import { getUserName } from "../utils/utils";
import AvatarIcon from "./AvatarIcon";
import '../css/comment.css'
import { BrowserView, MobileView } from "react-device-detect";

type CommentComponentProps = {
    comment: api.PostComment;
}
class CommentComponent extends React.Component<CommentComponentProps, any>{


    render() {
        return <div >
            <BrowserView>
                <div className="comment-container-desktop">
                    <div className="comment-avatar-desktop" >
                        <AvatarIcon imageUrl={this.props.comment.commenter.profile_photo_url} size={32} active={false} />
                    </div>
                    <div>
                        <div className="comment-username-desktop"> {getUserName(this.props.comment.commenter)} </div>
                        <div className="comment-time-desktop">{timeSince(new Date(this.props.comment.created_at))} </div>
                    </div>
                </div>
                <div className="comment-message-desktop">{this.props.comment.message}</div>
            </BrowserView>
            <MobileView>
                <div className="comment-container">
                    <div className="comment-avatar" >
                        <AvatarIcon imageUrl={this.props.comment.commenter.profile_photo_url} size={32} active={false} />
                    </div>
                    <div>
                        <div className="comment-username"> {getUserName(this.props.comment.commenter)} </div>
                        <div className="comment-time">{timeSince(new Date(this.props.comment.created_at))} </div>
                    </div>
                </div>
                <div className="comment-message">{this.props.comment.message}</div>
            </MobileView>

        </div>
    }
}

export default CommentComponent;