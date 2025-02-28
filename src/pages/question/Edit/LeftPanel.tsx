import { AppleOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';

import { ComponentLib } from './ComponentLib';

export const LeftPanel: FC = () => {
    const tabItems: TabsProps['items'] = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppleOutlined />
                    组件库
                </span>
            ),
            children: <ComponentLib />,
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <div>图层</div>,
        },
    ];
    return (
        <div>
            <Tabs items={tabItems} />
        </div>
    );
};
