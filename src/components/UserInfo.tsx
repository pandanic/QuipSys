import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import { useDispatch } from 'react-redux';

import { removeToken } from '../utils/user-token';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { logoutReducer } from '../store/userReducer';

export const UserInfo: FC = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { username, nickname } = useGetUserInfo();

    const loginOut = () => {
        dispatch(logoutReducer());
        removeToken();
        nav('/login');
        message.success('退出成功');
    };

    const UserInfoElem = (
        <>
            <span>
                <UserOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={loginOut}>
                退出
            </Button>
        </>
    );

    const LoginElem = (
        <>
            <Link to="/login">登录</Link>
        </>
    );

    return <div>{username ? UserInfoElem : LoginElem}</div>;
};
