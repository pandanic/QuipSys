/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionInputPropsDefault } from './interface';

export * from './interface';

export default {
    title: '输入框',
    type: 'questionInput',
    Component,
    defaultProps: QuestionInputPropsDefault,
};
