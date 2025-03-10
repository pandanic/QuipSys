import { FC, MouseEvent } from 'react';

import { Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

import {
    ComponentInfoType,
    changeSelectedId,
    moveComponent,
} from '../../../store/qustionComponentReducer';
import { getComponentConfig } from '../../../components/QustionConponments';

import useBindCavarsKeyPress from '../../../hooks/useBindCavarsKeyPress';

import SortableContainer from '../../../components/DragSortable/SortableContainer';

import SortableItem from '../../../components/DragSortable/SortableItem';

import styles from './EditCanvars.module.scss';

type PropsType = {
    loading?: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo;
    const componentConfig = getComponentConfig(type);
    if (!componentConfig) {
        return null;
    }
    const { Component } = componentConfig;
    return <Component {...props} />;
}

const EditCanvars: FC<PropsType> = ({ loading }) => {
    const { componentList, selectedId } = useGetComponentInfo();

    const dispatch = useDispatch();
    function handleClick(event: MouseEvent, id: string) {
        event.stopPropagation();
        dispatch(changeSelectedId(id));
    }

    useBindCavarsKeyPress();
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '124px' }}>
                <Spin />
            </div>
        );
    }

    const componnetListWithId = componentList.map((c) => ({ ...c, id: c.fe_id }));
    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({ oldIndex, newIndex }));
    }
    return (
        <SortableContainer items={componnetListWithId} onDragEnd={handleDragEnd}>
            <div className={styles.canvars}>
                {componentList
                    .filter((c) => !c.isHidden)
                    .map((item) => {
                        const { fe_id: id, isLocked } = item;
                        const warrperDefaultClassNames = styles['component-warrper'];
                        const selectedClassNames = styles.selected;
                        const lockedName = styles.locked;
                        const warrperClassNames = classNames({
                            [warrperDefaultClassNames]: true,
                            [selectedClassNames]: id === selectedId,
                            [lockedName]: isLocked,
                        });
                        return (
                            <SortableItem id={item.fe_id}>
                                <div
                                    key={id}
                                    className={warrperClassNames}
                                    onClick={(e) => handleClick(e, id)}
                                >
                                    <div className={styles.component}>{genComponent(item)}</div>
                                </div>
                            </SortableItem>
                        );
                    })}
            </div>
        </SortableContainer>
    );
};

export default EditCanvars;
