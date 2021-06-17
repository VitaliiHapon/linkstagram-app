import axios from "axios";
import { API_URL } from "../utils/api";
import { deleteLoginToken, saveLogin, saveLoginToken, saveUsername } from "../utils/auth";
import { profilesApi } from "../adapters/profiles";

export namespace authApi {

    type LoginData = {
        login: string,
        password: string,
    }

    type SignupData = {
        username: string,
        login: string,
        password: string,
    }

    export function logIn(loginData: LoginData, errorCallback: (field: string, message: string) => void) {
        return axios.post<{ success: string }>(API_URL + "/login", loginData)
            .then((v) => {
                if (v.status == 200) {

                    saveLoginToken(v.headers.authorization);
                    saveLogin(loginData.login);
                    profilesApi.getAccount((x) => {
                        if (x.username != null) saveUsername(x.username)
                        window.location.href = "/"
                    });
                  
                }
            })
            .catch((err) => {
                console.log(err.response['data']['field-error'])
                errorCallback(err.response['data']['field-error'][0], err.response['data']['field-error'][1])

            });
    }

    export function signUp(signupData: SignupData, errorCallback: (field: string, message: string) => void) {
        return axios.post<{ success: string }>(API_URL + "/create-account", signupData)
            .then((v) => {
                if (v.status == 200) {

                    saveLoginToken(v.headers.authorization);
                    saveLogin(signupData.login);
                    window.location.href = "/"
                }
                console.log(v)
            })
            .catch((err) => {
                console.log(err.response['data']['field-error'])
                errorCallback(err.response['data']['field-error'][0], err.response['data']['field-error'][1])

            });;
    }

    export function logOut() {
        deleteLoginToken();
    }

}