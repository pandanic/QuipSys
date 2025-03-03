import { FC } from 'react';

import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextAreaConfig, { QuestionTextAreaPropsType } from './QuestionTextArea';
import QuestionRadioConfig, { QuestionRadioPropsType } from './QuestionRadio';

export type QuestionComponentType = QuestionTitlePropsType &
    QuestionInputPropsType &
    QuestionParagraphPropsType &
    QuestionInfoPropsType &
    QuestionTextAreaPropsType &
    QuestionRadioPropsType;

export type ComponentConfigType = {
    title: string;
    Component: FC<QuestionComponentType>;
    type: string;
    PropComponent: FC<QuestionComponentType>;
    defaultProps: QuestionComponentType;
};

const componentConfigList: ComponentConfigType[] = [
    QuestionTitleConfig,
    QuestionInputConfig,
    QuestionParagraphConfig,
    QuestionInfoConfig,
    QuestionTextAreaConfig,
    QuestionRadioConfig,
];

export const ComponentGroupConfig = [
    {
        groupId: 'text',
        groupName: '文本显示',
        components: [QuestionInfoConfig, QuestionTitleConfig, QuestionParagraphConfig],
    },
    {
        groupId: 'userInput',
        groupName: '用户输入',
        components: [QuestionInputConfig, QuestionTextAreaConfig],
    },
    {
        groupId: 'choseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConfig],
    },
];
export function getComponentConfig(type: string) {
    return componentConfigList.find((c) => c.type === type);
}
