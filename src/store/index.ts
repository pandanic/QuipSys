import { configureStore } from '@reduxjs/toolkit';

import userReducer, { UserStateType } from './userReducer';
import qustionComponentReducer, { QuestionComponentStateType } from './qustionComponentReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';

export type StateType = {
    user: UserStateType;
    questionComponents: QuestionComponentStateType;
    pageInfo: PageInfoType;
};

export default configureStore({
    reducer: {
        user: userReducer,
        questionComponents: qustionComponentReducer,
        pageInfo: pageInfoReducer,
    },
});
