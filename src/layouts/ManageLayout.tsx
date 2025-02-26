import { FC } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'; /*  */

import styles from './ManageLayout.module.scss';

export const ManageLayout: FC = () => {
    const nav = useNavigate();
    const { pathname } = useLocation();
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Space direction="vertical">
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        style={{ marginBottom: '60px' }}
                    >
                        创建问卷
                    </Button>

                    <Button
                        type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                        size="large"
                        icon={<BarsOutlined />}
                        onClick={() => nav('list')}
                    >
                        我的问卷
                    </Button>
                    <Button
                        type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
                        size="large"
                        icon={<StarOutlined />}
                        onClick={() => nav('star')}
                    >
                        星标问卷
                    </Button>
                    <Button
                        type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => nav('trash')}
                    >
                        回收站
                    </Button>
                </Space>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    );
};
