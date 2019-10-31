const AUTH_TOKEN_KEY = 'authToken';

const authTokenProvider = {
    getToken: () => {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },
    saveToken: (token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
}

export default authTokenProvider;