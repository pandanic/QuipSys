import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import cloneDeep from 'lodash.clonedeep';

import { arrayMove } from '@dnd-kit/sortable';

import { QuestionComponentType } from '../../components/QustionConponments';

import { getNextSelectedId, insertNewComponent } from './utils';

export type ComponentInfoType = {
    fe_id: string;
    type: string;
    title: string;
    isHidden?: boolean;
    isLocked?: boolean;
    props: QuestionComponentType;
};

export type QuestionComponentStateType = {
    selectedId: string;
    componentList: Array<ComponentInfoType>;
    copiedComponent?: ComponentInfoType | null;
};

const INIT_STATE: QuestionComponentStateType = {
    selectedId: '',
    componentList: [],
    copiedComponent: null,
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
                insertNewComponent(draft, newItem);
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
        hiddenSelectComponent: produce(
            (
                draft: QuestionComponentStateType,
                action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
            ) => {
                const { fe_id: id, isHidden } = action.payload;
                const component = draft.componentList.find((c) => c.fe_id === id);
                let newSelectedId = '';
                if (isHidden) {
                    newSelectedId = getNextSelectedId(id, draft.componentList);
                } else {
                    newSelectedId = id;
                }

                draft.selectedId = newSelectedId;
                if (component) {
                    component.isHidden = isHidden;
                }
            },
        ),
        toggleComponentLock: produce(
            (draft: QuestionComponentStateType, action: PayloadAction<{ fe_id: string }>) => {
                const { fe_id: id } = action.payload;
                const traget = draft.componentList.find((c) => c.fe_id === id);
                if (traget) {
                    traget.isLocked = !traget.isLocked;
                }
            },
        ),
        copyComponent: produce((draft: QuestionComponentStateType) => {
            const { selectedId, componentList = [] } = draft;
            const index = componentList.findIndex((c) => c.fe_id === selectedId);
            if (index < 0) return;
            const component = componentList[index];
            draft.copiedComponent = cloneDeep(component);
        }),

        pastedComponent: produce((draft: QuestionComponentStateType) => {
            const { copiedComponent } = draft;
            if (!copiedComponent) return;
            copiedComponent.fe_id = nanoid();
            insertNewComponent(draft, copiedComponent);
        }),

        selectPrevComponent: produce((draft: QuestionComponentStateType) => {
            const { selectedId, componentList = [] } = draft;
            const index = componentList.findIndex((c) => c.fe_id === selectedId);
            if (index <= 0) return;
            const prevComponent = componentList[index - 1];
            draft.selectedId = prevComponent.fe_id;
        }),

        selectNextComponent: produce((draft: QuestionComponentStateType) => {
            const { selectedId, componentList = [] } = draft;
            const index = componentList.findIndex((c) => c.fe_id === selectedId);
            if (index < 0 || index >= componentList.length - 1) return;
            const nextComponent = componentList[index + 1];
            draft.selectedId = nextComponent.fe_id;
        }),
        changeComponentTitle: produce(
            (
                draft: QuestionComponentStateType,
                action: PayloadAction<{ id: string; title: string }>,
            ) => {
                const { componentList = [] } = draft;
                const { id, title } = action.payload;
                const currComp = componentList.find((c) => c.fe_id === id);
                if (currComp) {
                    currComp.title = title;
                }
            },
        ),
        moveComponent: produce(
            (
                draft: QuestionComponentStateType,
                action: PayloadAction<{ oldIndex: number; newIndex: number }>,
            ) => {
                const { componentList: oldList } = draft;
                const { oldIndex, newIndex } = action.payload;

                draft.componentList = arrayMove(oldList, oldIndex, newIndex);
            },
        ),
    },
});

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentProps,
    removeSelectedComponent,
    hiddenSelectComponent,
    toggleComponentLock,
    copyComponent,
    pastedComponent,
    selectPrevComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent,
} = questionComponentSlice.actions;
export default questionComponentSlice.reducer;
