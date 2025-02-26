import { FC } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const { Title } = Typography;
export const Logo: FC = () => {
    return (
        <Link to="/">
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
