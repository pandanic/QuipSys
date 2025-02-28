import { FC } from 'react';

import { Typography, Input } from 'antd';

import { QuestionInputPropsDefault, QuestionInputPropsType } from './interface';

const { Paragraph } = Typography;
const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { title, placeholder } = { ...QuestionInputPropsDefault, ...props };
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <Input placeholder={placeholder} />
            </div>
        </div>
    );
};

export default QuestionInput;
