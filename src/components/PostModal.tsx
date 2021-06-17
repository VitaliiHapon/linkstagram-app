import React from "react";
import { api } from "../adapters/post";
import { getUserName } from "../utils/utils";
import AvatarIcon from "./AvatarIcon";
import ImageCarousel from "./ImageCarousel";
import Modal from "./Modal";

type PostModalProps = {
    post?: api.PostInfo | null;
    comments?: api.PostComment[] | null;
    visible: any;
    onClose: any;
}

class PostModal extends React.Component<PostModalProps>{
    renderImages() {
        console.log("SD")
        console.log(this.props.post)
        if (this.props.post == null) {
            return null;
        }
        return (
            <div className="post-modal-images">
                <ImageCarousel width={599} height={680} renderControl={true} imageUrls={this.props.post?.photos.map(x => x.url)} />
            </div>)
    }

    render() {
        return (
            <Modal onClose={this.props.onClose} width={1079} height={680} hasCloseButton={true} visible={this.props.visible} >
                <div className="post-modal-container">
                    {this.renderImages()}
                    <div >
                        <div className="post-modal-header"> 
                            <AvatarIcon active={false} size={40} imageUrl={this.props.post?.author.profile_photo_url ?? null} ></AvatarIcon>
                            <div  className="post-modal-username">  {getUserName(this.props.post?.author)}</div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PostModal;