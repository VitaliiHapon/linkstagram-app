import axios from "axios";
import { number } from "prop-types";
import { API_URL } from "../utils/api";
import { getAuthHeader } from "../utils/auth";



export namespace photosApi {
    export function createPost( callback: (response: any) => void) {
        return axios.get<any>(API_URL + "/s3/params",  getAuthHeader()).then(v => callback(v.data));
    }
}

