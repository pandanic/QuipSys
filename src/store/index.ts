import { configureStore } from '@reduxjs/toolkit';

import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

import userReducer, { UserStateType } from './userReducer';
import qustionComponentReducer, { QuestionComponentStateType } from './qustionComponentReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
    user: UserStateType;
    questionComponents: StateWithHistory<QuestionComponentStateType>;
    pageInfo: PageInfoType;
};

export default configureStore({
    reducer: {
        user: userReducer,
        questionComponents: undoable(qustionComponentReducer, {
            limit: 20,
            filter: excludeAction([
                'questionComponent/resetComponents',
                'questionComponent/changeSelectedId',
                'questionComponent/selectPrevComponent',
                'questionComponent/selectNextComponent',
                'questionComponent/copyComponent',
            ]),
        }),
        pageInfo: pageInfoReducer,
    },
});
