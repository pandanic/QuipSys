import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import { QuestionComponentType } from '../../components/QustionConponments';

export type ComponentInfoType = {
    fe_id: string;
    type: string;
    title: string;
    props: QuestionComponentType;
};

export type QuestionComponentStateType = {
    selectedId: string;
    componentList: Array<ComponentInfoType>;
};

const INIT_STATE: QuestionComponentStateType = {
    selectedId: '',
    componentList: [],
};

export const questionComponentSlice = createSlice({
    name: 'questionComponent',
    initialState: INIT_STATE,
    reducers: {
        resetComponents: (
            state: QuestionComponentStateType,
            action: PayloadAction<QuestionComponentStateType>,
        ) => {
            return action.payload;
        },
        changeSelectedId: produce(
            (draft: QuestionComponentStateType, action: PayloadAction<string>) => {
                draft.selectedId = action.payload;
            },
        ),
    },
});

export const { resetComponents, changeSelectedId } = questionComponentSlice.actions;
export default questionComponentSlice.reducer;
