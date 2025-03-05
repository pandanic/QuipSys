import { FC } from 'react';

import { Button, Space, Tooltip } from 'antd';
import {
    BlockOutlined,
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    RedoOutlined,
    UndoOutlined,
    UpOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { ActionCreators } from 'redux-undo';

import {
    copyComponent,
    hiddenSelectComponent,
    moveComponent,
    pastedComponent,
    removeSelectedComponent,
    toggleComponentLock,
} from '../../../store/qustionComponentReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    const { selectedId, selectComponent, copiedComponent, componentList } = useGetComponentInfo();
    const { isLocked } = selectComponent || {};
    const { length } = componentList;
    const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
    const isFirst = selectedIndex <= 0;
    const isLast = selectedIndex >= length - 1;

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
    function handleMoveUp() {
        if (isFirst) return;
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
    }
    function handleMoveDown() {
        if (isLast) return;
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
    }
    function handleUndo() {
        dispatch(ActionCreators.undo());
    }
    function handleRedo() {
        dispatch(ActionCreators.redo());
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
            <Tooltip title="上移">
                <Button
                    shape="circle"
                    icon={<UpOutlined />}
                    disabled={isFirst}
                    onClick={handleMoveUp}
                />
            </Tooltip>
            <Tooltip title="下移">
                <Button
                    shape="circle"
                    icon={<DownOutlined />}
                    disabled={isLast}
                    onClick={handleMoveDown}
                />
            </Tooltip>
            <Tooltip title="撤销">
                <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo} />
            </Tooltip>
            <Tooltip title="重做">
                <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo} />
            </Tooltip>
        </Space>
    );
};

export default EditToolbar;
