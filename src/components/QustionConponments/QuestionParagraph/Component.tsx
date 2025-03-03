import { FC } from 'react';

import { Typography } from 'antd';

import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface';

const { Paragraph } = Typography;
const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { isCenter, text = '' } = { ...QuestionParagraphDefaultProps, ...props };
    const textlist = text.split('\n');
    return (
        <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: 0 }}>
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
    );
};

export default Component;
