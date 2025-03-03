import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getQuestionService } from '../services/question';
import { resetComponents } from '../store/qustionComponentReducer';

export const useLoadingQuestionData = () => {
    const { id = '' } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error, run } = useRequest(
        async (idProp: string) => {
            if (!idProp) throw new Error('问卷id为空');
            const res = await getQuestionService(idProp);
            return res;
        },
        {
            manual: true,
        },
    );

    useEffect(() => {
        if (!data) return;
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { title = '', componentList = [] } = data;
        let selectedId = '';
        if (componentList.length > 0) {
            selectedId = componentList[0].fe_id;
        }
        dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
    }, [data]);

    useEffect(() => {
        run(id);
    }, [id]);
    return { loading, error };
};
