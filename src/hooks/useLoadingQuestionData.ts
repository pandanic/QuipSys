import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { getQuestionService } from '../services/question';

export const useLoadingQuestionData = () => {
    const { id = '' } = useParams();

    async function load() {
        const data = await getQuestionService(id);
        return data;
    }
    const { loading, data, error } = useRequest(load);
    return { loading, data, error };
};
