import React from "react";

import { api } from "../adapters/post";
import { timeSince } from "../utils/time-utils";
import AvatarIcon from "./AvatarIcon";
import ImageCarousel from "./ImageCarousel";
import '../css/post.css'
import ClickAwayListener from "react-click-away-listener";
import { getUsername } from "../utils/auth";
import CommentComponent from "./CommentComponent";
import { getUserName } from "../utils/utils";
import { isMobile } from "react-device-detect";

type PostState = {
    postId: number,
    post?: api.PostInfo | null;
    comments?: api.PostComment[] | null;
    likeInfo: api.LikeInfo,
    menuOpened: boolean,
    deleted: boolean,
    commentsVisible: boolean
}


type PostComponentProps = {
    postId?: number,
    post?: api.PostInfo,
    onPostOpen?: (onComment: () => void, onLike: () => void, likeInfo: api.LikeInfo, post?: api.PostInfo | null, comments?: api.PostComment[]) => void
}

class PostComponent extends React.Component<PostComponentProps, PostState>{
    constructor(props: any) {
        super(props);
        this.state = {
            postId: this.props.postId ?? this.props.post?.id ?? -1,
            post: null,
            likeInfo: { isLiked: false, likesCount: 0 },
            menuOpened: false,
            deleted: false,
            commentsVisible: false
        }

    }

    componentDidMount() {
        let setPost = (response: any) => {
            this.setState({
                post: response,
                likeInfo: {
                    isLiked: response?.is_liked ?? false,
                    likesCount: response.likes_count
                }
            });
        }


        if (this.props.post)
            api.getPost(this.props.post.id, setPost);
        else
            api.getPost(this.state.postId, setPost);

        api.getPostComments(this.state.postId, (response) => {
            this.setState({ comments: response });
        })
    }

    refreshComments() {
        api.getPostComments(this.state.postId, (response) => {
            this.setState({ comments: response });
        })
    }


    renderLikeIcon() {
        if (this.state.likeInfo.isLiked) {
            return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path d="M12 6.75L10.0758 5.26982C6.87868 2.81053 2.25 5.0897 2.25 9.12323C2.25 10.9652 2.98172 12.7317 4.28418 14.0342L10.7197 20.4697C11.0592 20.8092 11.5198 21 12 21C12.4802 21 12.9408 20.8092 13.2803 20.4697L19.7158 14.0342C21.0183 12.7317 21.75 10.9652 21.75 9.12323C21.75 5.0897 17.1213 2.81053 13.9242 5.26982L12 6.75Z" fill="#FB766E" />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>);
        }
        else {
            return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <path d="M12 6.75L10.0758 5.26982C6.87868 2.81053 2.25 5.0897 2.25 9.12323C2.25 10.9652 2.98172 12.7317 4.28418 14.0342L10.7197 20.4697C11.0592 20.8092 11.5198 21 12 21C12.4802 21 12.9408 20.8092 13.2803 20.4697L19.7158 14.0342C21.0183 12.7317 21.75 10.9652 21.75 9.12323C21.75 5.0897 17.1213 2.81053 13.9242 5.26982L12 6.75Z" fill="#C9CAD1" />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>);
        }
    }


    likePost() {
        let callback = (success: boolean, liked: boolean) => {
            if (!success)
                return;

            this.setState({
                likeInfo: {
                    isLiked: liked,
                    likesCount: (liked ? this.state.likeInfo.likesCount + 1 : this.state.likeInfo.likesCount - 1)
                }
            });

        }
        if (this.state.likeInfo.isLiked)
            api.removeLike(this.state.postId, (x) => callback(x, false));
        else
            api.setLike(this.state.postId, (x) => callback(x, true));
    }

    renderImages(onImageClicked: any) {
        if (this.state.post == null) {
            return null;
        }
        return (<ImageCarousel onImageClicked={onImageClicked} renderControl={true} imageUrls={this.state.post?.photos.map(x => x.url)} />)
    }

    deletePost() {
        api.deletePost(this.state.post?.id ?? -1, () => {
            this.setState({
                deleted: true
            })
        })
    }

    renderMenu() {
        if (!this.state.menuOpened)
            return null;
        else {
            let sameAuthor = this.state.post?.author.username === getUsername();
            return (<ClickAwayListener onClickAway={() => { this.setState({ menuOpened: !this.state.menuOpened }) }}>
                <div className={"post-menu" + (sameAuthor ? " post-menu-delete-button" : "")}
                    style={{ color: sameAuthor ? "" : "#DFDFDF" }}
                    onClick={() => { if (sameAuthor) this.deletePost() }}>
                    Delete
                </div>
            </ClickAwayListener>)
        }
    }

    renderCommentsIcon() {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M12.75 18.75C16.8921 18.75 20.25 15.3921 20.25 11.25C20.25 7.10786 16.8921 3.75 12.75 3.75C8.60786 3.75 5.25 7.10786 5.25 11.25V20.25C5.25 21.4861 6.66115 22.1916 7.65 21.45L10.85 19.05C11.1096 18.8553 11.4254 18.75 11.75 18.75H12.75Z" fill="#C9CAD1" />
                <rect x="9.75" y="9" width="6" height="1.5" rx="0.75" fill="#FAFBFC" />
                <rect x="9.75" y="12" width="4.5" height="1.5" rx="0.75" fill="#FAFBFC" />
            </svg >)
    }

    renderComments() {
        if (this.state.commentsVisible && isMobile)
            return (
                <div className="post-comments-container">
                    {this.state.comments?.map((x) => <CommentComponent comment={x}></CommentComponent>)}
                </div>);
        return null;
    }

    onPostOpen() {
        if (this.props.onPostOpen) this.props.onPostOpen(() => { this.refreshComments() }, () => { this.likePost() }, this.state.likeInfo, this.state.post, this.state.comments ?? []);
    }

    render() {
        if (this.state.deleted)
            return null;

        return (
            <div>
                <div className="post-header-container">
                    <div className="post-avatar">
                        <AvatarIcon link={"/profile/" + this.state.post?.author.username} active={false} imageUrl={null} size={40} />
                    </div>
                    <div>
                        <div className="post-user-name"> {getUserName(this.state.post?.author)} </div>

                        <div className="post-post-date"> {timeSince(new Date(this.state.post?.created_at ?? ""))}</div>
                    </div>
                    <div  className="post-menu-container post-clickable">
                        <div className="post-menu-button" onClick={() => this.setState({ menuOpened: !this.state.menuOpened })}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.25">
                                    <rect x="14" y="7" width="4" height="4" rx="2" fill="#010101" />
                                    <rect x="14" y="21" width="4" height="4" rx="2" fill="#010101" />
                                    <rect x="14" y="14" width="4" height="4" rx="2" fill="#010101" />
                                </g>
                            </svg>
                        </div>
                        {this.renderMenu()}
                    </div>
                </div>
                <div className="post-clickable">
                    {this.renderImages(() => { this.onPostOpen() })}
                </div>
                <div className="post-description">
                    {this.state.post?.description ?? ""}
                </div>
                <div className="post-footer-container">
                    <div className="post-clickable" onClick={() => this.likePost()}>
                        {this.renderLikeIcon()}
                    </div>
                    <span className="post-numbers">
                        {this.state.likeInfo.likesCount}
                    </span>

                    <span className="post-clickable " onClick={() => {
                        this.onPostOpen();
                        this.setState({ commentsVisible: !this.state.commentsVisible })
                    }}>
                        {this.renderCommentsIcon()}
                    </span>

                    <span className="post-numbers">
                        {this.state.comments?.length ?? 0}
                    </span>

                </div>
                {this.renderComments()}
            </div>
        )
    }
}

export default PostComponent;