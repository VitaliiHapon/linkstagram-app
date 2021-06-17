import React from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { api } from "../adapters/post";
import PostComponent from "./PostComponent";
import PostModal from "./PostModal";
import '../css/home.css'
import EditModal from "./EditModal";

type HomePageState = {
    posts: api.PostInfo[]
    postMoadlVisible: boolean,
    selectedPost: api.PostInfo | null,
    comments: api.PostComment[] | null,
    likeInfo: api.LikeInfo;
    onLike: () => void;
    onComment: () => void;

}

class HomePage extends React.Component<any, HomePageState>{
    constructor(props: any) {
        super(props)
        this.state = {
            posts: [],
            postMoadlVisible: false,
            selectedPost: null,
            comments: [],
            onLike: () => { },
            onComment: () => { },
            likeInfo: {
                isLiked: false,
                likesCount: 0
            },

        }

        api.getAllPosts((x) => this.setState({ posts: x }));
    }

    renderPostModal() {
        if (!this.state.postMoadlVisible || isMobile)
            return null;

        return (<PostModal onClose={() => this.setState({ postMoadlVisible: false })}
            visible={this.state.postMoadlVisible}
            post={this.state.selectedPost}
            comments={this.state.comments}
            onLike={this.state.onLike}
            likeInfo={this.state.likeInfo}
            onComment={this.state.onComment} />)
    }


    renderPost(post: any) {
        return (
            <div className="home-page-post">
                <PostComponent onPostOpen={(onComment: () => void, onLike: () => void, likeInfo: api.LikeInfo, post: any, comments: any) => {
                    this.setState({
                        onComment: onComment,
                        onLike: onLike,
                        likeInfo: likeInfo,
                        selectedPost: post,
                        comments: comments,
                        postMoadlVisible: true
                    })
                }} key={post.id} post={post} />
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.renderPostModal()}
                <MobileView>
                    <div className="home-page-container-mobile">
                        <div>
                            {this.state.posts.map((x) => this.renderPost(x))}
                        </div>
                    </div>
                </MobileView>
                <BrowserView>
                <div className="home-page-container-mobile">
                        <div>
                            {this.state.posts.map((x) => this.renderPost(x))}
                        </div>
                    </div>
                </BrowserView>
            </div>
        )
    }
}

export default HomePage;