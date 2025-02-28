import { useSelector } from 'react-redux';

import { StateType } from '../store';
import { QuestionComponentStateType } from '../store/qustionComponentReducer';

function useGetComponentInfo() {
    const components = useSelector<StateType>(
        (state) => state.questionComponents,
    ) as QuestionComponentStateType;

    const { componentList = [], selectedId } = components;

    return {
        componentList,
        selectedId,
    };
}

export default useGetComponentInfo;
