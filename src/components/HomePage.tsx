import React from "react";
import { api } from "../adapters/post";
import PostComponent from "./PostComponent";
import PostModal from "./PostModal";

type HomePageState = {
    posts: api.PostInfo[]
    postMoadlVisible: boolean,
    selectedPost:  api.PostInfo | null,
    comments: api.PostComment[] | null
}

class HomePage extends React.Component<any, HomePageState>{
    constructor(props: any) {
        super(props)
        this.state = {
            posts: [],
            postMoadlVisible: false,
            selectedPost: null,
            comments: []
        }

        api.getAllPosts((x) => this.setState({ posts: x }));
    }
    render() {
        console.log("HOME");
        console.log(this.state.posts);
        return (
            <div>
               
                <PostModal onClose={() => this.setState({ postMoadlVisible: false })} visible={this.state.postMoadlVisible} post={this.state.selectedPost}></PostModal>
                <div className="home-page-container">
                    <div>
                        {this.state.posts.map((x) => <PostComponent onPostOpen={(post: any, comments: any) => {
                            this.setState({
                                selectedPost:post,
                                comments:comments,
                                postMoadlVisible: true
                            })
                        }} key={x.id} post={x} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;