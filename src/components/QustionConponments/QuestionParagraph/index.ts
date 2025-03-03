/**
 * @description 问卷的输入框
 */
import Component from './Component';
import { QuestionParagraphDefaultProps } from './interface';
import PropComponent from './PropComponent';

export * from './interface';

export default {
    title: '段落',
    type: 'questionParagraph',
    Component,
    PropComponent,
    defaultProps: QuestionParagraphDefaultProps,
};
