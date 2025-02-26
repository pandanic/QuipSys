import { Button, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';

const { Title, Paragraph } = Typography;

export const Home: FC = () => {
    const nav = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>欢迎来到问卷系统</Title>
                <Paragraph>在这里，您可以创建、编辑和管理各种类型的问卷。</Paragraph>
                <Button type="primary" size="large" onClick={() => nav('/manage/list')}>
                    开始创建
                </Button>
            </div>
        </div>
    );
};
