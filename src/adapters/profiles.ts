import axios from "axios";
import { API_URL } from "../utils/api";
import { getAuthHeader } from "../utils/auth";



export namespace profilesApi {
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

    export interface AccountInfo {
        username?: string,
        email?: string,
        description?: string,
        first_name?: string,
        followers?: Number,
        following?: Number,
        job_title?: string,
        last_name?: string,
        profile_photo_url?: string
    }

    export function  getProfile(username: string, callback: (response: ProfileInfo) => void) {
        return axios.get<ProfileInfo>(API_URL + "/profiles/" + username, getAuthHeader()).then(v => { callback(v.data); console.log("#234") });
    }

    export function getProfiles(callback: (response: ProfileInfo[]) => void) {
        return axios.get<ProfileInfo[]>(API_URL + "/profiles", getAuthHeader()).then(v => callback(v.data));
    }

    export function getAccount(callback: (response: AccountInfo) => void) {
        return axios.get<AccountInfo>(API_URL + "/account", getAuthHeader()).then(v => callback(v.data));
    }

    export function editAccount(data: any, callback: (response: any) => void) {
        return axios.patch(API_URL + "/account", {"account": data}, getAuthHeader()).then(v => callback(v.data));
    }

}

