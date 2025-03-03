import { FC } from 'react';

import { Typography, Input } from 'antd';

import { QuestionTextAreaPropsDefault, QuestionTextAreaPropsType } from './interface';

const { Paragraph } = Typography;
const QuestionInput: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
    const { title, placeholder } = { ...QuestionTextAreaPropsDefault, ...props };
    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <div>
                <Input.TextArea placeholder={placeholder} />
            </div>
        </div>
    );
};

export default QuestionInput;
