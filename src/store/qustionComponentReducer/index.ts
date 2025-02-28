import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import { QuestionComponentType } from '../../components/QustionConponments';

import { getNextSelectedId } from './utils';

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
        changeComponentProps: produce(
            (
                draft: QuestionComponentStateType,
                action: PayloadAction<{ id: string; newProps: QuestionComponentType }>,
            ) => {
                const { id, newProps } = action.payload;
                const component = draft.componentList.find((c) => c.fe_id === id);
                if (component) {
                    component.props = {
                        ...component.props,
                        ...newProps,
                    };
                }
            },
        ),
        removeSelectedComponent: produce((draft: QuestionComponentStateType) => {
            const { selectedId, componentList = [] } = draft;
            const newSelectedId = getNextSelectedId(selectedId, componentList);
            const index = componentList.findIndex((c) => c.fe_id === selectedId);
            draft.selectedId = newSelectedId;
            componentList.splice(index, 1);
        }),
    },
});

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
} = questionComponentSlice.actions;
export default questionComponentSlice.reducer;
