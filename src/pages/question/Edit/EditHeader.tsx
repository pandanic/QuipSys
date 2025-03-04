import { ChangeEvent, FC, useState } from 'react';

import { Button, Input, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useKeyPress, useRequest } from 'ahooks';

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
                        <Button type="primary">发布</Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default EditHeader;
