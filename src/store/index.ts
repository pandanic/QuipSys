import { configureStore } from '@reduxjs/toolkit';

import userReducer, { UserStateType } from './userReducer';
import qustionComponentReducer, { QuestionComponentStateType } from './qustionComponentReducer';

export type StateType = {
    user: UserStateType;
    questionComponents: QuestionComponentStateType;
};

export default configureStore({
    reducer: {
        user: userReducer,
        questionComponents: qustionComponentReducer,
    },
});
