import { FC } from 'react';

import { useLoadingQuestionData } from '../../../hooks/useLoadingQuestionData';

export const Edit: FC = () => {
    const { loading, data } = useLoadingQuestionData();
    return (
        <div>
            <h1>Edit</h1>
            {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
        </div>
    );
};
