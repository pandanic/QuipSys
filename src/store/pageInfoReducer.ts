import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

export type PageInfoType = {
    title: string;
    desc?: string;
    js?: string;
    css?: string;
};

const INIT_STATE: PageInfoType = {
    title: '',
    desc: '',
    js: '',
    css: '',
};

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        restPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
            return action.payload;
        },
        changPageTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
            draft.title = action.payload;
        }),
    },
});

export const { restPageInfo, changPageTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
