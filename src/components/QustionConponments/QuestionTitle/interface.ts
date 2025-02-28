export type QuestionTitlePropsType = {
    text?: string;
    level?: 1 | 2 | 3;
    isCenter?: boolean;
};

export const QuestionTitlePropsDefault: QuestionTitlePropsType = {
    text: '题目',
    level: 1,
    isCenter: false,
};
