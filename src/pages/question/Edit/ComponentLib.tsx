import { FC } from 'react';

import { Typography } from 'antd';

import { useDispatch } from 'react-redux';

import { nanoid } from '@reduxjs/toolkit';

import { ComponentConfigType, ComponentGroupConfig } from '../../../components/QustionConponments';

import { addComponent } from '../../../store/qustionComponentReducer';

import styles from './ComponentLib.module.scss';

export const ComponentLib: FC = () => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    function genComponents(c: ComponentConfigType) {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { title, Component, type, defaultProps } = c;

        function handleClick() {
            dispatch(addComponent({ fe_id: nanoid(), type, title, props: defaultProps }));
        }

        return (
            <div key={type} className={styles.warpper} onClick={handleClick}>
                <div className={styles.component}>
                    <Component />
                </div>
            </div>
        );
    }
    return (
        <div>
            {ComponentGroupConfig.map((item, index) => {
                return (
                    <div key={item.groupId}>
                        <Title
                            level={3}
                            style={{
                                fontSize: '15px',
                                marginTop: index > 0 ? '20px' : '0',
                                textAlign: 'center',
                            }}
                        >
                            {item.groupName}
                        </Title>
                        <div>{item.components.map((c) => genComponents(c))}</div>
                    </div>
                );
            })}
        </div>
    );
};
