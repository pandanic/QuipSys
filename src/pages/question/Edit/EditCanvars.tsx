import { FC, MouseEvent } from 'react';

import { Spin } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

import { ComponentInfoType, changeSelectedId } from '../../../store/qustionComponentReducer';
import { getComponentConfig } from '../../../components/QustionConponments';

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
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '124px' }}>
                <Spin />
            </div>
        );
    }

    return (
        <div className={styles.canvars}>
            {componentList.map((item) => {
                const { fe_id: id } = item;
                const warrperDefaultClassNames = styles['component-warrper'];
                const selectedClassNames = styles.selected;
                const warrperClassNames = classNames({
                    [warrperDefaultClassNames]: true,
                    [selectedClassNames]: id === selectedId,
                });
                return (
                    <div key={id} className={warrperClassNames} onClick={(e) => handleClick(e, id)}>
                        <div className={styles.component}>{genComponent(item)}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default EditCanvars;
