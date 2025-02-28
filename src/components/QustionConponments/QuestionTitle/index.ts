/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionTitlePropsDefault } from './interface';

export * from './interface';

export default {
    title: '标题',
    type: 'questionTitle',
    Component,
    defaultProps: QuestionTitlePropsDefault,
};
