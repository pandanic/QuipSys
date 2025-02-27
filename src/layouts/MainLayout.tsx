import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import { Logo } from '../components/Logo';

import { UserInfo } from '../components/UserInfo';

import { useLoadUserData } from '../hooks/useLoadUserInfoData';

import { useNavPage } from '../hooks/useNavPage';

import styles from './MainLayout.module.scss';

const { Header, Content, Footer } = Layout;
export const MainLayout: FC = () => {
    const { waitngUserData } = useLoadUserData();
    useNavPage(waitngUserData);
    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <Logo />
                </div>
                <div className={styles.right}>
                    <UserInfo />
                </div>
            </Header>
            <Content className={styles.main}>
                {waitngUserData ? (
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <Spin />
                    </div>
                ) : (
                    <Outlet />
                )}
            </Content>
            <Footer className={styles.footer}>问卷 &copy; 2023-present</Footer>
        </Layout>
    );
};
