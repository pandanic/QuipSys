import { useSelector } from 'react-redux';

import { StateType } from '../store';
import { QuestionComponentStateType } from '../store/qustionComponentReducer';

function useGetComponentInfo() {
    const components = useSelector<StateType>(
        (state) => state.questionComponents,
    ) as QuestionComponentStateType;

    const { componentList = [], selectedId } = components;
    const selectComponent = componentList.find((c) => c.fe_id === selectedId);
    return {
        componentList,
        selectedId,
        selectComponent,
    };
}

export default useGetComponentInfo;
