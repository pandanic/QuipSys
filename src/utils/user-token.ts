const KEY = 'accessToken';

export const getToken = () => {
    const token = localStorage.getItem(KEY);
    if (token) {
        return token;
    }
    return '';
};

export const setToken = (token: string) => {
    localStorage.setItem(KEY, token);
};

export const removeToken = () => {
    localStorage.removeItem(KEY);
};

export const isLogin = () => {
    return !!getToken();
};
