import { ChangeEvent, FC, useState } from 'react';

import classNames from 'classnames';

import { Button, Input, message, Space } from 'antd';

import { useDispatch } from 'react-redux';

import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

import {
    changeComponentTitle,
    changeSelectedId,
    hiddenSelectComponent,
    moveComponent,
    toggleComponentLock,
} from '../../../store/qustionComponentReducer';

import SortableContainer from '../../../components/DragSortable/SortableContainer';

import SortableItem from '../../../components/DragSortable/SortableItem';

import styles from './Layers.module.scss';

const Layers: FC = () => {
    const { componentList, selectedId } = useGetComponentInfo();
    const dispatch = useDispatch();
    const [changingTitle, setChangingTitle] = useState('');
    function changingTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        const newTitle = e.target.value.trim();
        if (!newTitle) {
            message.info('标题不能为空');
            return;
        }
        if (!selectedId) return;
        dispatch(changeComponentTitle({ id: selectedId, title: newTitle }));
    }
    function handleTitleClick(id: string) {
        const curComp = componentList.find((c) => c.fe_id === id);
        if (curComp && curComp.isHidden) {
            message.info('不能选中隐藏组件');
            return;
        }
        if (id !== selectedId) {
            dispatch(changeSelectedId(id));
            setChangingTitle('');
            return;
        }

        setChangingTitle(id);
    }

    function changHidden(id: string, isHidden: boolean) {
        dispatch(hiddenSelectComponent({ fe_id: id, isHidden }));
    }
    function changLock(id: string) {
        dispatch(toggleComponentLock({ fe_id: id }));
    }

    const ComponentListWithID = componentList.map((c) => {
        return {
            ...c,
            id: c.fe_id,
        };
    });
    function handleDragEnd(oldIndex: number, newIndex: number) {
        if (oldIndex === newIndex) return;
        dispatch(moveComponent({ oldIndex, newIndex }));
    }

    return (
        <SortableContainer items={ComponentListWithID} onDragEnd={handleDragEnd}>
            {componentList.map((item) => {
                const titleDefault = styles.title;
                const { selected } = styles;

                const titleClassName = classNames(titleDefault, {
                    [titleDefault]: true,
                    [selected]: item.fe_id === selectedId,
                });

                return (
                    <SortableItem key={item.fe_id} id={item.fe_id}>
                        <div className={styles.warrper}>
                            <div
                                className={titleClassName}
                                onClick={() => handleTitleClick(item.fe_id)}
                            >
                                {item.fe_id === changingTitle && (
                                    <Input
                                        value={item.title}
                                        onPressEnter={() => setChangingTitle('')}
                                        onChange={(e) => changingTitleHandler(e)}
                                        onBlur={() => setChangingTitle('')}
                                    />
                                )}
                                {item.fe_id !== changingTitle && item.title}
                            </div>
                            <div className={styles.handler}>
                                <Space>
                                    <Button
                                        onClick={() => changHidden(item.fe_id, !item.isHidden)}
                                        size="small"
                                        shape="circle"
                                        className={item.isHidden ? styles.btn : ''}
                                        icon={<EyeInvisibleOutlined />}
                                        type={item.isHidden ? 'primary' : 'text'}
                                    />
                                    <Button
                                        onClick={() => changLock(item.fe_id)}
                                        size="small"
                                        shape="circle"
                                        className={item.isLocked ? styles.btn : ''}
                                        icon={<LockOutlined />}
                                        type={item.isLocked ? 'primary' : 'text'}
                                    />
                                </Space>
                            </div>
                        </div>
                    </SortableItem>
                );
            })}
        </SortableContainer>
    );
};
export default Layers;
