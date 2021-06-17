import axios from "axios";
import { API_URL } from "../utils/api";
import { getAuthHeader } from "../utils/auth";



export namespace api {
    export type ProfileInfo = {
        username: string,
        description: string,
        first_name: string,
        followers: Number,
        following: Number,
        job_title: string,
        last_name: string,
        profile_photo_url: string
    }

    export type PostInfo = {
        id: number,
        author: ProfileInfo,
        created_at: string,
        description: string,
        is_liked: boolean,
        likes_count: number,
        photos: {
            id: number,
            url: string
        }[]
    }

    export type CreatePostInfo = {
        description: string,
        photos_attributes: {
            image: {
                id:string,
                storage:string,
                metadata:{
                    size:number,
                    mime_type:string,
                    filename: string
                }
            }
        }[]
    }

    export type PostComment = {
        id: number,
        commenter: ProfileInfo,
        created_at: string,
        message: string
    }

    export type LikeInfo = {
        isLiked: boolean,
        likesCount: number
    }


    export function getPost(id: number, callback: (response: PostInfo) => void) {
        return axios.get<PostInfo>(API_URL + "/posts/" + id, getAuthHeader()).then(v => callback(v.data));
    }

    export function getAllPosts( callback: (response: PostInfo[]) => void) {
        return axios.get<PostInfo[]>(API_URL + "/posts", getAuthHeader()).then(v => callback(v.data));
    }

    export function getPostsByUser(username: string, callback: (response: PostInfo[]) => void) {
        return axios.get<PostInfo[]>(API_URL + "/profiles/" + username + "/posts", getAuthHeader()).then(v => callback(v.data));
    }

    export function deletePost(id: number, callback: (response: {message:string}) => void) {
        return axios.delete<{message:string}>(API_URL + "/posts/" + id, getAuthHeader()).then(v => callback(v.data));
    }
    
    export function createPost(post: CreatePostInfo, callback: (response: PostInfo) => void) {
        return axios.post<PostInfo>(API_URL + "/posts", post, getAuthHeader()).then(v => callback(v.data));
    }

    export function getPostComments(id: number,  callback: (response: PostComment[]) => void) {
        return axios.get<PostComment[]>(API_URL + "/posts/" + id + "/comments", getAuthHeader()).then(v => callback(v.data));
    }

    export function addPostComment(id: number, message: string, callback: (response: PostComment) => void) {
        return axios.post<PostComment>(API_URL + "/posts/" + id + "/comments", {message: message}, getAuthHeader()).then(v => callback(v.data));
    }


    export function setLike(id: number, callback: (success: boolean) => void) {
        return axios.post(API_URL + "/posts/" + id + "/like", {}, getAuthHeader()).then(v => callback(v.status === 200));
    }

    export function removeLike(id: number, callback: (success: boolean) => void) {
        return axios.delete(API_URL + "/posts/" + id + "/like",  getAuthHeader()).then(v => callback(v.status === 200));
    }


}

