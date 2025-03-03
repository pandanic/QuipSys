import { FC } from 'react';

import { Typography } from 'antd';

import { QuestionInfoPropsDefault, QuestionInfoPropsType } from './interface';

const { Title, Paragraph } = Typography;
const QuestionInput: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title = '', desc = '' } = { ...QuestionInfoPropsDefault, ...props };
    const textlist = desc.split('\n');
    return (
        <div style={{ textAlign: 'center' }}>
            <Title style={{ fontSize: '24px' }}>{title}</Title>
            <Paragraph style={{ marginBottom: 0 }}>
                {textlist.map((item, index) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={index}>
                            {index > 0 && <br />}
                            {item}
                        </span>
                    );
                })}
            </Paragraph>
        </div>
    );
};

export default QuestionInput;
