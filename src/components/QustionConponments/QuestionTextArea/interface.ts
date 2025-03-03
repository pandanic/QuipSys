export type QuestionTextAreaPropsType = {
    title?: string;
    placeholder?: string;

    disabled?: boolean;
    onChange?: (newProps: QuestionTextAreaPropsType) => void;
};

export const QuestionTextAreaPropsDefault: QuestionTextAreaPropsType = {
    title: '文本域标题',
    placeholder: '请输入...',
};
