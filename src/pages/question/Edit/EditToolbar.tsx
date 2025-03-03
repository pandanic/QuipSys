import { FC } from 'react';

import { Button, Space, Tooltip } from 'antd';
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import {
    copyComponent,
    hiddenSelectComponent,
    pastedComponent,
    removeSelectedComponent,
    toggleComponentLock,
} from '../../../store/qustionComponentReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    const { selectedId, selectComponent, copiedComponent } = useGetComponentInfo();
    const { isLocked } = selectComponent || {};

    function handleDelete() {
        dispatch(removeSelectedComponent());
    }
    function handleHidden() {
        dispatch(hiddenSelectComponent({ fe_id: selectedId, isHidden: true }));
    }
    function handleLock() {
        dispatch(toggleComponentLock({ fe_id: selectedId }));
    }
    function handleCopy() {
        dispatch(copyComponent());
    }

    function handlePaste() {
        dispatch(pastedComponent());
    }
    return (
        <Space>
            <Tooltip title="删除">
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
            </Tooltip>
            <Tooltip title="隐藏">
                <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
            </Tooltip>
            <Tooltip title="锁定">
                <Button
                    shape="circle"
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'default'}
                    onClick={handleLock}
                />
            </Tooltip>
            <Tooltip title="复制">
                <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
            </Tooltip>
            <Tooltip title="粘贴">
                <Button
                    shape="circle"
                    icon={<BlockOutlined />}
                    disabled={copiedComponent === null}
                    onClick={handlePaste}
                />
            </Tooltip>
        </Space>
    );
};

export default EditToolbar;
