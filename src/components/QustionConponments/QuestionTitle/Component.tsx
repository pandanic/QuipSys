import { FC } from 'react';
import { Typography } from 'antd';

import { QuestionTitlePropsDefault, QuestionTitlePropsType } from './interface';

const { Title } = Typography;
const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { text, isCenter, level } = { ...QuestionTitlePropsDefault, ...props };

    const getFontSize = (fontLevel?: number) => {
        const fontSize = [24, 20, 16];
        if (!fontLevel) {
            return fontSize[0];
        }
        return fontSize[fontLevel - 1];
    };

    return (
        <div>
            <Title
                level={level}
                style={{
                    textAlign: isCenter ? 'center' : 'start',
                    marginBottom: 0,
                    fontSize: getFontSize(level),
                }}
            >
                {text}
            </Title>
        </div>
    );
};

export default QuestionTitle;
