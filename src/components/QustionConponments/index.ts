import { FC } from 'react';

import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle';
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput';

export type QuestionComponentType = QuestionTitlePropsType & QuestionInputPropsType;

export type ComponentConfigType = {
    title: string;
    Component: FC<QuestionComponentType>;
    type: string;
    defaultProps: QuestionComponentType;
};

const componentConfigList: ComponentConfigType[] = [QuestionTitleConfig, QuestionInputConfig];

export const ComponentGroupConfig = [
    { groupId: 'text', groupName: '文本显示', components: [QuestionTitleConfig] },
    { groupId: 'userInput', groupName: '用户输入', components: [QuestionInputConfig] },
];
export function getComponentConfig(type: string) {
    return componentConfigList.find((c) => c.type === type);
}
