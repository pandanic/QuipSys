import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useGetUserInfo } from './useGetUserInfo';

function isLoginRegisterPageRouter(pathname: string) {
    if (['/login', '/register'].includes(pathname)) return true;
    return false;
}

function isNoNeedLogin(pathname: string) {
    if (['/login', '/register', '/home'].includes(pathname)) return true;
    return false;
}

export function useNavPage(waitngUserData: boolean) {
    const { pathname } = useLocation();
    const nav = useNavigate();
    const { username } = useGetUserInfo();
    useEffect(() => {
        if (waitngUserData) return;
        if (username) {
            if (isLoginRegisterPageRouter(pathname)) {
                nav('/manage/list');
            }
            return;
        }
        if (!isNoNeedLogin(pathname)) {
            nav('/login');
        }
    }, [waitngUserData, username, pathname]);
}
