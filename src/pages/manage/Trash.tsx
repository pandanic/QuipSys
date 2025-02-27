import { FC, useState } from 'react';
import { Button, Empty, Modal, Space, Spin, Table, Typography } from 'antd';

import { useLoadingQuestionListData } from '../../hooks/useLoadingQuestionListData';

import { ListPage } from '../../components/ListPage';

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
    const { data = {}, loading } = useLoadingQuestionListData({ isStar: true });
    const { list = [], total = 0 } = data;
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    const deleteQuestion = () => {
        confirm({
            title: '确认删除',
            content: '确认删除选中的问题吗？删除后不可找回',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                setSelectedRowKeys([]);
            },
        });
    };
    const TableElement = (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Space>
                    <Button type="primary" disabled={selectedRowKeys.length === 0}>
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
                        console.log(selectedRowKeys);
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
