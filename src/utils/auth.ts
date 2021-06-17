
export function saveLoginToken(token: string) {
    localStorage.setItem("auth-header-value", token);
}

export function saveLogin(login: string) {
    localStorage.setItem("user-login-value", login);
}

export function saveUsername(username: string) {
    localStorage.setItem("user-name-value", username);
}

export function deleteLoginToken() {
    localStorage.removeItem("auth-header-value");
    localStorage.removeItem("user-login-value");
    localStorage.removeItem("user-name-value");
}

export function checkLoginToken(): boolean {
    return localStorage.getItem("auth-header-value") != null;
}


export function getLoginToken(): string | null {
    return localStorage.getItem("auth-header-value");
}

export function getUsername(): string | null {
    return localStorage.getItem("user-name-value");
}

export function getLogin(): string | null {
    return localStorage.getItem("user-login-value");
}


export function getAuthHeader(): any {
    if (!checkLoginToken())
        return {}
    return {
        headers: {
            'Authorization': getLoginToken()
        },
    };
}