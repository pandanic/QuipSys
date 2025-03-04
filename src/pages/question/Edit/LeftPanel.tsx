import { AppleOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { FC } from 'react';

import { ComponentLib } from './ComponentLib';
import Layers from './Layers';

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
            children: (
                <div>
                    <Layers />
                </div>
            ),
        },
    ];
    return (
        <div>
            <Tabs items={tabItems} />
        </div>
    );
};
