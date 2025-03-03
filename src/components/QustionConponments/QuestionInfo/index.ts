/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionInfoPropsDefault } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
    title: '问卷信息',
    type: 'questionInfo',
    Component,
    PropComponent,
    defaultProps: QuestionInfoPropsDefault,
};
