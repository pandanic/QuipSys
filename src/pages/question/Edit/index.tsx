import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { useTitle } from 'ahooks';

import { useLoadingQuestionData } from '../../../hooks/useLoadingQuestionData';

import { changeSelectedId } from '../../../store/qustionComponentReducer';

import useGetPageInfo from '../../../hooks/useGetPageInfo';

import styles from './index.module.scss';
import EditCanvars from './EditCanvars';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import EditHeader from './EditHeader';

export const Edit: FC = () => {
    const dispatch = useDispatch();
    const { title } = useGetPageInfo();
    useTitle(`问卷编辑--${title}`);
    function clearSelected() {
        dispatch(changeSelectedId(''));
    }

    const { loading } = useLoadingQuestionData();
    return (
        <div className={styles.container}>
            <div>
                <EditHeader />
            </div>
            <div className={styles['content-warrper']}>
                <div className={styles.conetent}>
                    <div className={styles.left}>
                        <div className={styles['left-warrper']}>
                            <LeftPanel />
                        </div>
                    </div>
                    <div className={styles.main} onClick={() => clearSelected()}>
                        <div className={styles['canvars-warrper']}>
                            <EditCanvars loading={loading} />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};
