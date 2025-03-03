export type QuestionTitlePropsType = {
    text?: string;
    level?: 1 | 2 | 3;
    isCenter?: boolean;

    disabled?: boolean;
    onChange?: (newProps: QuestionTitlePropsType) => void;
};

export const QuestionTitlePropsDefault: QuestionTitlePropsType = {
    text: '标题',
    level: 1,
    isCenter: false,
};
