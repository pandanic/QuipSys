import { FC, useState } from 'react';

import { Button, Divider, message, Modal, Popconfirm, Space, Tag } from 'antd';

import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    LineChartOutlined,
    StarFilled,
    StarOutlined,
} from '@ant-design/icons';

import { Link, useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';

import { duplicateQuestionService, updateQuestionService } from '../services/question';

import styles from './QuestionCard.module.scss';

type QuestionCardProps = {
    id: number;
    title: string;
    isPublish: boolean;
    anwserCount: number;
    createTime: string;
    isStar: boolean;
};

export const QuestionCard: FC<QuestionCardProps> = (prop: QuestionCardProps) => {
    const { id, title, createTime, anwserCount, isPublish, isStar } = prop;
    const [isStarState, setIsStarState] = useState(isStar);

    const { loading: changeStarLoading, run: changeStar } = useRequest(
        async () => {
            await updateQuestionService(id, { isStar: !isStarState });
        },
        {
            manual: true,
            onSuccess: () => {
                setIsStarState(!isStarState);
                message.success('已更新');
            },
        },
    );
    const nav = useNavigate();
    const { confirm } = Modal;

    const { loading: duplicateLoading, run: duplicate } = useRequest(
        async () => {
            const data = await duplicateQuestionService(id);
            return data;
        },
        {
            manual: true,
            onSuccess: (res: any) => {
                message.success('复制成功');
                nav(`/question/edit/${res.id}`);
            },
        },
    );
    const [isDeleted, setIsDeleted] = useState(false);
    const { loading: deletedLoading, run: handleDeleted } = useRequest(
        async () => {
            const data = await updateQuestionService(id, { isDeleted: true });
            return data;
        },
        {
            manual: true,
            onSuccess: () => {
                message.info('删除成功');
                setIsDeleted(true);
            },
        },
    );

    function remove() {
        confirm({
            title: '确认删除该问卷?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: handleDeleted,
        });
    }
    if (isDeleted) return null;
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <div>
                        <Link to={isPublish ? `/question/stat/${id}` : `/question/edit/${id}`}>
                            <Space>
                                {isStar && <StarFilled style={{ color: 'red' }} />}
                                {title}
                            </Space>
                        </Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublish ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}

                        <span>答卷:{anwserCount}</span>

                        <span>{createTime}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{ margin: '10px' }} />
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            icon={<EditOutlined />}
                            type="text"
                            size="small"
                            onClick={() => nav(`/question/edit/${id}`)}
                        >
                            编辑问卷
                        </Button>
                        <Button
                            icon={<LineChartOutlined />}
                            type="text"
                            size="small"
                            onClick={() => nav(`/question/stat/${id}`)}
                            disabled={!isPublish}
                        >
                            数据统计
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button
                            icon={<StarOutlined />}
                            type="text"
                            onClick={changeStar}
                            disabled={changeStarLoading}
                        >
                            {isStarState ? '取消标星' : '标星'}
                        </Button>
                        <Popconfirm
                            title="是否确认复制该问卷?"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={duplicate}
                        >
                            <Button icon={<CopyOutlined />} type="text" disabled={duplicateLoading}>
                                复制
                            </Button>
                        </Popconfirm>
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={remove}
                            disabled={deletedLoading}
                        >
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};
