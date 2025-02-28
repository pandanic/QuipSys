import { FC } from 'react';

import { useDispatch } from 'react-redux';

import { useLoadingQuestionData } from '../../../hooks/useLoadingQuestionData';

import { changeSelectedId } from '../../../store/qustionComponentReducer';

import styles from './index.module.scss';
import EditCanvars from './EditCanvars';

export const Edit: FC = () => {
    const dispatch = useDispatch();
    function clearSelected() {
        dispatch(changeSelectedId(''));
    }

    const { loading } = useLoadingQuestionData();
    return (
        <div className={styles.container}>
            <div>header</div>
            <div className={styles['content-warrper']}>
                <div className={styles.conetent}>
                    <div className={styles.left}>left</div>
                    <div className={styles.main} onClick={() => clearSelected()}>
                        <div className={styles['canvars-warrper']}>
                            <EditCanvars loading={loading} />
                        </div>
                    </div>
                    <div className={styles.right}>right</div>
                </div>
            </div>
        </div>
    );
};
