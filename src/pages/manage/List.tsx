import { FC, useState } from 'react';

import { Typography } from 'antd';

import { QuestionCard } from '../../components/QuestionCard';

import { ListSearch } from '../../components/ListSearch';

import styles from './common.module.scss';

const { Title } = Typography;
export const List: FC = () => {
    const [questionList] = useState([
        {
            id: 1,
            title: '问题1',
            isPublish: true,
            isStart: false,
            anwserCount: 1,
            createTime: '2022-01-01',
            isStar: true,
        },
        {
            id: 2,
            title: '问题2',
            isPublish: true,
            isStart: true,
            anwserCount: 1,
            createTime: '2022-01-01',
            isStar: false,
        },
        {
            id: 3,
            title: '问题3',
            isPublish: false,
            isStart: false,
            anwserCount: 2,
            createTime: '2022-01-01',
            isStar: true,
        },
    ]);
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
                {questionList.length > 0 &&
                    questionList.map((item) => {
                        const { id } = item;
                        return <QuestionCard key={id} {...item} />;
                    })}
            </div>
            <div className={styles.footer}>loadMore</div>
        </>
    );
};
