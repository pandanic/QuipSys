import { FC } from 'react';

import classNames from 'classnames';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { getComponentConfig } from '../../../components/QustionConponments';

import styles from './ComponentList.module.scss';

type Props = {
    selectId: string;
    setSelectId: (id: string) => void;
    setSelectType: (type: string) => void;
};

const ComponentList: FC<Props> = (prop: Props) => {
    const { selectId, setSelectId, setSelectType } = prop;
    const { componentList } = useGetComponentInfo();

    return (
        <div className={styles['component-list ']}>
            {componentList
                .filter((c) => !c.isHidden)
                .map((item) => {
                    const { fe_id: id, props, type } = item;
                    const config = getComponentConfig(type);
                    const warrperDefaultClassNames = styles['component-warrper'];
                    const selectedClassNames = styles.selected;

                    const warrperClassNames = classNames({
                        [warrperDefaultClassNames]: true,
                        [selectedClassNames]: id === selectId,
                    });
                    return (
                        <div
                            key={id}
                            className={warrperClassNames}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectId(id);
                                setSelectType(id);
                            }}
                        >
                            <div className={styles.component}>
                                {config ? <config.Component {...props} /> : null}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default ComponentList;
