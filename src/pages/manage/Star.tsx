import { FC } from 'react';

import { Empty, Spin, Typography } from 'antd';

import { QuestionCard } from '../../components/QuestionCard';

import { ListSearch } from '../../components/ListSearch';

import { useLoadingQuestionListData } from '../../hooks/useLoadingQuestionListData';

import { ListPage } from '../../components/ListPage';

import styles from './common.module.scss';

const { Title } = Typography;

export const Star: FC = () => {
    const { data = {}, loading } = useLoadingQuestionListData({ isStar: true });
    const { list = [], total = 0 } = data;
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>星标问卷</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无数据" />}
                {list.length > 0 &&
                    list.map((item: any) => {
                        const { id } = item;
                        return <QuestionCard key={id} {...item} />;
                    })}
            </div>
            <div className={styles.footer} style={{}}>
                <ListPage total={total} />
            </div>
        </>
    );
};
