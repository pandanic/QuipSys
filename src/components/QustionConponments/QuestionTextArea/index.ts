/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionTextAreaPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
    title: '输入框',
    type: 'questionTextArea',
    Component,
    PropComponent,
    defaultProps: QuestionTextAreaPropsDefault,
};
