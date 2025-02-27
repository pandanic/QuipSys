import { FC } from 'react';

import { Spin, Typography } from 'antd';

import { QuestionCard } from '../../components/QuestionCard';

import { ListSearch } from '../../components/ListSearch';

import { useLoadingQuestionListData } from '../../hooks/useLoadingQuestionListData';

import styles from './common.module.scss';

const { Title } = Typography;
export const List: FC = () => {
    const { data = {}, loading } = useLoadingQuestionListData({});
    const { list = [] } = data;
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>我的问卷</Title>
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
                {!loading &&
                    list.length > 0 &&
                    list.map((item: any) => {
                        const { id } = item;
                        return <QuestionCard key={id} {...item} />;
                    })}
            </div>
            <div className={styles.footer}>loadMore</div>
        </>
    );
};
