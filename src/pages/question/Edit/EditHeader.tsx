import { ChangeEvent, FC, useState } from 'react';

import { Button, Input, message, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';

import useGetPageInfo from '../../../hooks/useGetPageInfo';

import { changPageTitle } from '../../../store/pageInfoReducer';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

import { updateQuestionService } from '../../../services/question';

import styles from './EditHeader.module.scss';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

const SaveButton: FC = () => {
    const { id } = useParams();
    const { componentList } = useGetComponentInfo();
    const pageInfo = useGetPageInfo();

    useDebounceEffect(
        () => {
            save();
        },
        [componentList, pageInfo],
        { wait: 2000 },
    );
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        event.preventDefault();
        if (!loading) save();
    });

    const { loading, run: save } = useRequest(
        async () => {
            if (!id) return;
            await updateQuestionService(parseInt(id, 10), { ...pageInfo, componentList });
        },
        {
            manual: true,
        },
    );
    return (
        <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
            保存
        </Button>
    );
};

const TitleElem: FC = () => {
    const { title } = useGetPageInfo();
    const [editState, setEditState] = useState(false);
    const dispatch = useDispatch();

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim();
        if (!newTitle) return;
        dispatch(changPageTitle(newTitle));
    }
    if (editState) {
        return (
            <Input
                value={title}
                onPressEnter={() => setEditState(false)}
                onBlur={() => setEditState(false)}
                onChange={(e) => handleTitleChange(e)}
            />
        );
    }
    return (
        <Space>
            <Title>{title}</Title>
            <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
        </Space>
    );
};

const PublishElem: FC = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { componentList } = useGetComponentInfo();
    const pageInfo = useGetPageInfo();
    const { loading, run: pub } = useRequest(
        async () => {
            if (!id) return;
            await updateQuestionService(parseInt(id, 10), {
                ...pageInfo,
                componentList,
                isPublish: true,
            });
        },
        {
            manual: true,
            onSuccess: () => {
                message.success('发布成功');
                nav(`/question/stat/${id}`);
            },
        },
    );
    return (
        <Button onClick={pub} loading={loading} type="primary">
            发布
        </Button>
    );
};
const EditHeader: FC = () => {
    const nav = useNavigate();

    return (
        <div className={styles['header-warpper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                            返回
                        </Button>
                        <TitleElem />
                    </Space>
                </div>
                <div className={styles.main}>
                    <EditToolbar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton />
                        <PublishElem />
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default EditHeader;
