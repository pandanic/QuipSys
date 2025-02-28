import { FC } from 'react';

import { Button, Space, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { removeSelectedComponent } from '../../../store/qustionComponentReducer';

const EditToolbar: FC = () => {
    const dispatch = useDispatch();
    function handleDelete() {
        dispatch(removeSelectedComponent());
        console.log('删除');
    }
    return (
        <Space>
            <Tooltip title="删除">
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
            </Tooltip>
        </Space>
    );
};

export default EditToolbar;
