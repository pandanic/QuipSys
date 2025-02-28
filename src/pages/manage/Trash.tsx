import { FC, useState } from 'react';
import { Button, Empty, message, Modal, Space, Spin, Table, Typography } from 'antd';

import { useRequest } from 'ahooks';

import { useLoadingQuestionListData } from '../../hooks/useLoadingQuestionListData';

import { ListPage } from '../../components/ListPage';

import { deleteQuestionService, updateQuestionService } from '../../services/question';

import styles from './common.module.scss';

const { Title } = Typography;
const { confirm } = Modal;
const columns = [
    {
        title: '问题标题',
        dataIndex: 'title',
    },
    {
        title: '是否发布',
        dataIndex: 'isPublish',
        render: (isPublish: boolean) => (isPublish ? '是' : '否'),
    },
    {
        title: '答卷次数',
        dataIndex: 'anwserCount',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
    },
];

export const Trash: FC = () => {
    const { data = {}, loading, refresh } = useLoadingQuestionListData({ isStar: true });
    const { list = [], total = 0 } = data;
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    const { loading: recoverLoading, run: recover } = useRequest(
        async () => {
            if (selectedRowKeys.length === 0) {
                return;
            }
            for await (const item of selectedRowKeys) {
                await updateQuestionService(parseInt(item, 10), { isDeleted: false });
            }
        },
        {
            manual: true,
            debounceWait: 1000,
            onSuccess: () => {
                message.success('回复成功');
                refresh();
                setSelectedRowKeys([]);
            },
        },
    );

    const { run: deletedQuestion } = useRequest(
        async () => {
            if (selectedRowKeys.length === 0) {
                return;
            }
            for await (const item of selectedRowKeys) {
                await deleteQuestionService(parseInt(item, 10));
            }
        },
        {
            manual: true,
            onSuccess: () => {
                message.success('删除成功');
                refresh();
                setSelectedRowKeys([]);
            },
        },
    );

    const deleteQuestion = () => {
        confirm({
            title: '确认删除',
            content: '确认删除选中的问题吗？删除后不可找回',
            okText: '确认',
            cancelText: '取消',
            onOk: deletedQuestion,
        });
    };
    const TableElement = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button
                        type="primary"
                        disabled={selectedRowKeys.length === 0 || recoverLoading}
                        onClick={recover}
                    >
                        恢复
                    </Button>
                    <Button danger disabled={selectedRowKeys.length === 0} onClick={deleteQuestion}>
                        彻底删除
                    </Button>
                </Space>
            </div>

            <Table
                columns={columns}
                dataSource={list}
                pagination={false}
                rowKey={(q: any) => q.id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedData) => {
                        setSelectedRowKeys(selectedData as string[]);
                    },
                }}
            />
        </>
    );

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>搜索</div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无数据" />}
                {list.length > 0 && TableElement}
            </div>
            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </>
    );
};
