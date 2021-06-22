import React from "react";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { api } from "../adapters/post";
import { getUsername } from "../utils/auth";
import EditModal from "./EditModal"
import NewPostModal from "./NewPostModal";
import PostComponent from "./PostComponent";
import PostModal from "./PostModal";
import ProfileInfo from "./ProfileInfoComponent";
import UserListComponent from "./UserListComponents";


type ProfilePageState = {
    posts: api.PostInfo[]
    profileEditModalVisible: boolean,
    newPostModalVisible: boolean,
    postMoadlVisible: boolean,
    selectedPost: api.PostInfo | null,
    comments: api.PostComment[] | null,
    likeInfo: api.LikeInfo;
    onLike: () => void;
    onComment: () => void;

}

class ProfilePage extends React.Component<any, ProfilePageState>{
    componentDidMount(){
        api.getPostsByUser(this.getUserName(), (x) => this.setState({ posts: x }));
        
    }

    state = {
        profileEditModalVisible: false,
        newPostModalVisible: false,
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

    renderProfileEditModal() {
        if (this.state.profileEditModalVisible === false)
            return null;
        return (
            <EditModal visible={this.state.profileEditModalVisible} onClose={() => { this.setState({ profileEditModalVisible: false }) }}>
     
            </EditModal>
        )
    }

    renderNewPostModal() {
        if (this.state.newPostModalVisible === false)
            return null;
        return (
            <NewPostModal visible={this.state.newPostModalVisible} onClose={() => { this.setState({ newPostModalVisible: false }) }}>
            </NewPostModal>
        )
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

    getUserName() {
        return this.props.match.params.userName ?? getUsername();
    }

    render() {

        return (
            <div>
                <MobileView>
                    <div className="profile-page-container-mobile">
                        <div className="profile-page-profile-container-mobile">
                            <ProfileInfo userName={this.props.match.params.userName ?? getUsername()} 
                            onOpenProfileEdit={() => this.setState({ profileEditModalVisible: true })} 
                            onOpenNewPostModal={() => this.setState({ newPostModalVisible: true })} />
                        </div>
                        <div className="profile-page-posts-container-mobile">
                            <div>
                                {this.state.posts.map((x) => this.renderPost(x))}
                            </div>
                        </div>
                    </div>
                </MobileView>
                <BrowserView>
                    {this.renderProfileEditModal()}
                    {this.renderNewPostModal()}
                    {this.renderPostModal()}

                    <div>
                        <div className="profile-page-container-desktop">
                            <div className="profile-page-profile-container-desktop">
                                <ProfileInfo userName={this.getUserName()} 
                                onOpenProfileEdit={() => this.setState({ profileEditModalVisible: true })} 
                                onOpenNewPostModal={() => this.setState({ newPostModalVisible: true })}/>
                            </div>
                            <div className="profile-page-posts-container-desktop">
                                <div className="profile-page-users-container">
                                    <UserListComponent iconSize={40} />
                                </div>
                                {this.state.posts.length === 0
                                    ? <div className="profile-page-no-post-yet-text">No Posts Yet</div>
                                    : this.state.posts.map((x) => this.renderPost(x))}


                            </div>
                        </div>
                    </div>
                </BrowserView>

            </div>
        )
    }
}

export default ProfilePage;