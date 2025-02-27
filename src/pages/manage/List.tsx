import { FC, useEffect, useRef, useState } from 'react';

import { Empty, Spin, Typography } from 'antd';

import { useSearchParams } from 'react-router-dom';

import { useDebounceFn, useRequest } from 'ahooks';

import { QuestionCard } from '../../components/QuestionCard';

import { ListSearch } from '../../components/ListSearch';

import { getQuestionListService } from '../../services/question';

import styles from './common.module.scss';

const { Title } = Typography;
export const List: FC = () => {
    // const { data = {}, loading } = useLoadingQuestionListData({});
    // const { list = [] } = data;
    const containerRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const haveModeData = total > list.length;
    const [searchParams] = useSearchParams();

    const { run: tryLoadMore } = useDebounceFn(
        () => {
            const elem = containerRef.current;
            if (elem == null) return;
            const domRect = elem.getBoundingClientRect();
            if (domRect == null) return;
            const { bottom } = domRect;
            if (bottom < document.body.clientHeight) {
                // 执行加载
                load();
                setStarted(true);
            }
        },
        { wait: 1000 },
    );

    const { run: load, loading } = useRequest(
        async () => {
            const res = await getQuestionListService({
                pageNo,
                pageSize: 10,
                keyword: searchParams.get('keyword') || '',
            });
            return res;
        },
        {
            manual: true,
            onSuccess(res) {
                const { list: l = [], total: t = 0 } = res;
                setList(list.concat(...l));
                setTotal(t);
                setPageNo(pageNo + 1);
            },
        },
    );

    useEffect(() => tryLoadMore(), [searchParams]);
    useEffect(() => {
        if (haveModeData) {
            window.addEventListener('scroll', tryLoadMore);
        }
        return () => {
            window.removeEventListener('scroll', tryLoadMore);
        };
    }, [searchParams, haveModeData]);

    const loadMoreContentElem = () => {
        if (!started || loading) return <Spin />;
        if (total === 0) return <Empty description="暂无数据" />;
        if (!haveModeData) return <span>没有更多数据了...</span>;
        return <span>加载更多...</span>;
    };

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
                {list.length > 0 &&
                    list.map((item: any) => {
                        const { id } = item;
                        return <QuestionCard key={id} {...item} />;
                    })}
            </div>
            <div className={styles.footer}>
                <div ref={containerRef}>{loadMoreContentElem()}</div>
            </div>
        </>
    );
};
