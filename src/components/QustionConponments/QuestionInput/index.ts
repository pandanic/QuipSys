/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionInputPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
    title: '输入框',
    type: 'questionInput',
    Component,
    PropComponent,
    defaultProps: QuestionInputPropsDefault,
};
