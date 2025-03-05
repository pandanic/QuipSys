import { useSelector } from 'react-redux';

import { StateType } from '../store';
import { QuestionComponentStateType } from '../store/qustionComponentReducer';

function useGetComponentInfo() {
    const components = useSelector<StateType>(
        (state) => state.questionComponents.present,
    ) as QuestionComponentStateType;

    const { componentList = [], selectedId, copiedComponent = null } = components;
    const selectComponent = componentList.find((c) => c.fe_id === selectedId);
    return {
        componentList,
        selectedId,
        selectComponent,
        copiedComponent,
    };
}

export default useGetComponentInfo;
