import { FC } from 'react';

import { useDispatch } from 'react-redux';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfig, QuestionComponentType } from '../../../components/QustionConponments';
import { changeComponentProps } from '../../../store/qustionComponentReducer';

const NoPage: FC = () => {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProps: FC = () => {
    const { selectComponent } = useGetComponentInfo();
    const dispatch = useDispatch();

    if (!selectComponent) {
        return <NoPage />;
    }

    const { type, props } = selectComponent;
    const componentConfig = getComponentConfig(type);
    if (!componentConfig) {
        return <NoPage />;
    }

    function changeProps(newProps: QuestionComponentType) {
        if (!selectComponent) return;
        const { fe_id: id } = selectComponent;
        dispatch(changeComponentProps({ id, newProps }));
    }

    const { PropComponent } = componentConfig;

    return <PropComponent {...props} onChange={changeProps} />;
};
export default ComponentProps;
