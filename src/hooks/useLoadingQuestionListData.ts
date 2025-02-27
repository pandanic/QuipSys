import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';

import { getQuestionListService } from '../services/question';

type OptionType = {
    isStar?: boolean;
    isDeleted?: boolean;
};
export const useLoadingQuestionListData = (opt: Partial<OptionType>) => {
    const { isStar = false, isDeleted = false } = opt;
    const [searchParams] = useSearchParams();
    const { data, loading, error } = useRequest(
        async () => {
            const keyword = searchParams.get('keyword') || '';
            const pageNo = parseInt(searchParams.get('pageNo') || '', 10) || 1;
            const pageSize = parseInt(searchParams.get('pageSize') || '', 10) || 10;
            const resData = await getQuestionListService({
                keyword,
                isStar,
                isDeleted,
                pageNo,
                pageSize,
            });
            return resData;
        },
        {
            refreshDeps: [searchParams],
        },
    );
    return { data, loading, error };
};
