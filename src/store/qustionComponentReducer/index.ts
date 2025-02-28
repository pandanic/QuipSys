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
        addComponent: produce(
            (draft: QuestionComponentStateType, action: PayloadAction<ComponentInfoType>) => {
                const newItem: ComponentInfoType = action.payload;
                const { selectedId, componentList } = draft;
                const index = componentList.findIndex((c) => c.fe_id === selectedId);
                if (index < 0) {
                    draft.componentList.push(newItem);
                } else {
                    draft.componentList.splice(index + 1, 0, newItem);
                }
                draft.selectedId = newItem.fe_id;
            },
        ),
    },
});

export const { resetComponents, changeSelectedId, addComponent } = questionComponentSlice.actions;
export default questionComponentSlice.reducer;
