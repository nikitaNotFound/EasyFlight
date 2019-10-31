const AUTH_TOKEN_KEY = 'authToken';

const authTokenProvider = {
    getToken: () => {
        return JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY)).authToken;
    },
    saveToken: (token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({ authToken: token }));
    }
}

export default authTokenProvider;