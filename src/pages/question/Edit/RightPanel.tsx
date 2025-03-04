import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { FC, useEffect, useState } from 'react';

import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

import ComponentProps from './ComponentProps';
import PageSetting from './PageSetting';

export const RightPanel: FC = () => {
    const [activeKey, setActiviKey] = useState('prop');
    const { selectedId } = useGetComponentInfo();
    useEffect(() => {
        if (selectedId) {
            setActiviKey('prop');
        } else {
            setActiviKey('setting');
        }
    }, [selectedId]);

    const tabItems: TabsProps['items'] = [
        {
            key: 'prop',
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProps />,
        },
        {
            key: 'setting',
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSetting />,
        },
    ];
    return (
        <div>
            <Tabs items={tabItems} activeKey={activeKey} />
        </div>
    );
};
