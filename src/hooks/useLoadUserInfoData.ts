import { useEffect, useState } from 'react';

import { useRequest } from 'ahooks';

import { useDispatch } from 'react-redux';

import { getUserService } from '../services/user';
import { loginReducer } from '../store/userReducer';

import { useGetUserInfo } from './useGetUserInfo';

export function useLoadUserData() {
    const [waitngUserData, setWaitngData] = useState(true);
    const dispatch = useDispatch();
    const { run } = useRequest(
        async () => {
            const res = await getUserService();
            return res;
        },
        {
            manual: true,
            onSuccess(result) {
                const { username, nickname } = result;
                dispatch(loginReducer({ username, nickname }));
            },
            onFinally() {
                setWaitngData(false);
            },
        },
    );
    const { username } = useGetUserInfo();
    useEffect(() => {
        if (username) {
            setWaitngData(false);
            return;
        }
        run();
    }, [username]);
    return { waitngUserData };
}
