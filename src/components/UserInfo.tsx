import { FC } from 'react';
import { Link } from 'react-router-dom';

export const UserInfo: FC = () => {
    return (
        <div>
            <Link to="/login">登录</Link>
        </div>
    );
};
