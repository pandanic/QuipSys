import { FC, useState } from 'react';

import { Button, Result, Spin } from 'antd';

import { useNavigate } from 'react-router-dom';

import { useTitle } from 'ahooks';

import { useLoadingQuestionData } from '../../../hooks/useLoadingQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';

import stytles from './index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';

export const Stat: FC = () => {
    const { loading } = useLoadingQuestionData();
    const { isPublish, title } = useGetPageInfo();
    const nav = useNavigate();

    const [selectId, setSelectId] = useState('');
    const [selectType, setSelectType] = useState('');
    console.log(selectId, selectType);

    useTitle(`问卷统计--${title}`);
    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Spin />
            </div>
        );
    }
    if (!isPublish) {
        return (
            <div style={{ flex: '1' }}>
                <Result
                    status="warning"
                    title="该问卷尚未发布"
                    extra={
                        <Button
                            type="primary"
                            onClick={() => {
                                nav(-1);
                            }}
                        >
                            返回
                        </Button>
                    }
                />
            </div>
        );
    }
    return (
        <div className={stytles.container}>
            <div>
                <StatHeader />
            </div>
            <div className={stytles['.content-warrper']}>
                <div className={stytles.content}>
                    <div className={stytles.left}>
                        <ComponentList
                            selectId={selectId}
                            setSelectId={setSelectId}
                            setSelectType={setSelectType}
                        />
                    </div>
                    <div className={stytles.main}>
                        <PageStat
                            selectId={selectId}
                            setSelectId={setSelectId}
                            setSelectType={setSelectType}
                        />
                    </div>
                    <div className={stytles.right}>有</div>
                </div>
            </div>
        </div>
    );
};
