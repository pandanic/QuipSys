import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';

import ComponentProps from './ComponentProps';

export const RightPanel: FC = () => {
    const tabItems: TabsProps['items'] = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProps />,
        },
        {
            key: 'layers',
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <div>页面设置</div>,
        },
    ];
    return (
        <div>
            <Tabs items={tabItems} />
        </div>
    );
};
