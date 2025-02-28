import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Spin } from 'antd';

import { useLoadUserData } from '../hooks/useLoadUserInfoData';
import { useNavPage } from '../hooks/useNavPage';

export const QuestionLayout: FC = () => {
    const { waitngUserData } = useLoadUserData();
    useNavPage(waitngUserData);
    return (
        <div>
            <div>
                {waitngUserData ? (
                    <div style={{ textAlign: 'center', marginTop: '20%' }}>
                        <Spin />
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};
