import { FC, useEffect, useState } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { useGetUserInfo } from '../hooks/useGetUserInfo';

import styles from './Logo.module.scss';

const { Title } = Typography;
export const Logo: FC = () => {
    const { username } = useGetUserInfo();
    const [pathname, setPathname] = useState('/');
    useEffect(() => {
        if (username) {
            setPathname('/manage/list');
        }
    }, [username]);
    return (
        <Link to={pathname}>
            <div className={styles.container}>
                <Space>
                    <Title>
                        <FormOutlined />
                    </Title>
                    <Title>问卷系统</Title>
                </Space>
            </div>
        </Link>
    );
};
