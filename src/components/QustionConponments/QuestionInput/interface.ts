export type QuestionInputPropsType = {
    title?: string;
    placeholder?: string;

    disabled?: boolean;
    onChange?: (newProps: QuestionInputPropsType) => void;
};

export const QuestionInputPropsDefault: QuestionInputPropsType = {
    title: '文本标题',
    placeholder: '请输入...',
};
