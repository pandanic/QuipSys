import { FC } from 'react';

import { Radio, Space, Typography } from 'antd';

import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';

const { Paragraph } = Typography;
const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const {
        title = '',
        isVertical = false,
        value,
        options,
    } = { ...QuestionRadioDefaultProps, ...props };

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Radio.Group value={value}>
                <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                    {options?.map((opt) => {
                        const { value: optValue, text } = opt;
                        return (
                            <Radio key={optValue} value={optValue}>
                                {text}
                            </Radio>
                        );
                    })}
                </Space>
            </Radio.Group>
        </div>
    );
};

export default Component;
