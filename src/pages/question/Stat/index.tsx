import { FC } from 'react';

import { useLoadingQuestionData } from '../../../hooks/useLoadingQuestionData';

export const Stat: FC = () => {
    const { loading, data } = useLoadingQuestionData();
    return (
        <div>
            <h1>Stat</h1>
            {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
        </div>
    );
};
