/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionTitlePropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
    title: '标题',
    type: 'questionTitle',
    Component,
    PropComponent,
    defaultProps: QuestionTitlePropsDefault,
};
