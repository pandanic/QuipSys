import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const QuestionLayout: FC = () => {
    return (
        <div>
            <div>QuestionLayout</div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};
