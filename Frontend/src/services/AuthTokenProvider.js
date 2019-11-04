const AUTH_TOKEN_KEY = 'authToken';

const authTokenProvider = {
    getToken: () => {
        const storageToken = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY))

        if (storageToken) {
            return storageToken.authToken;
        }

        return null;
    },
    saveToken: (token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify({ authToken: token }));
    }
}

export default authTokenProvider;