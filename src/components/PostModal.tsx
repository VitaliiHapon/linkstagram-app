import React from "react";
import { api } from "../adapters/post";
import { getUserName } from "../utils/utils";
import AvatarIcon from "./AvatarIcon";
import CommentComponent from "./CommentComponent";
import ImageCarousel from "./ImageCarousel";
import Modal from "./Modal";
import '../css/post.css'

type PostModalProps = {
    post?: api.PostInfo | null;
    comments?: api.PostComment[] | null;
    visible: any;
    onClose: any;
    likeInfo: api.LikeInfo;
    onLike: () => void;
    onComment: () => void;


}

class PostModal extends React.Component<PostModalProps, any>{
    constructor(props:any){
        super(props)
        this.state = {
            liked: this.props.likeInfo.isLiked,
            likesCount: this.props.likeInfo.likesCount,
            comment: "",
            comments: this.props.comments
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    renderImages() {
        if (this.props.post == null) {
            return null;
        }
        return (
            <div className="post-modal-images">
                <ImageCarousel width={599} height={680} renderControl={true} imageUrls={this.props.post?.photos.map(x => x.url)} />
            </div>)
    }

    renderComments() {
        return (
            <div className="post-modal-comments-container">
                {this.state.comments?.map((x: any) => <CommentComponent comment={x}></CommentComponent>)}
            </div>);
    }

    renderLikeIcon() {
        if (this.state.liked) {
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
        let newCount = this.state.liked ? this.state.likesCount - 1 : this.state.likesCount + 1;
        let isLiked = !this.state.liked;

        this.setState({
            liked: isLiked,
            likesCount: newCount
        })

        this.props.onLike();
    }

    handleSubmit(event: any) {
        api.addPostComment(this.props.post?.id ?? 0, this.state.comment, ()=> {
            this.setState({
                comment: ""
            });


            api.getPostComments(this.props.post?.id ?? 0, (response) => {
                this.setState({ comments: response },()=>{
                    console.log(this.state.comments);
                    this.props.onComment();
                });
            } )

          

        })
        
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
            <Modal onClose={this.props.onClose} width={1079} height={680} hasCloseButton={true} visible={this.props.visible} >
                <div className="post-modal-container">
                    {this.renderImages()}
                    <div >
                        <div className="post-modal-header">
                            <AvatarIcon active={false} size={40} imageUrl={this.props.post?.author.profile_photo_url ?? null} ></AvatarIcon>
                            <div className="post-modal-username">  {getUserName(this.props.post?.author)}</div>
                        </div>
                        {this.renderComments()}
                        <div className="post-modal-like-container">
                            <div className="post-clickable" onClick={() => this.likePost()}>
                                {this.renderLikeIcon()}
                            </div>
                            <span className="post-numbers post-numbers-desktop">
                                {this.state.likesCount}
                            </span>
                        </div>

                        <div>
                            <form className="post-modal-comment-form" onSubmit={this.handleSubmit}>
                                <input className="post-modal-comment-input" type="text"
                                    name="comment"
                                    placeholder="Add a comment ..."
                                    value={this.state.comment} 
                                    onChange={this.handleChange} />

                                    <input className="post-modal-comment-post" type="submit" value="Post"></input>

                            </form>

                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PostModal;