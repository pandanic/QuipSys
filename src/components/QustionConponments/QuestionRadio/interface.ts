export type OptionsType = {
    value: string;
    text: string;
};

export type QuestionRadioPropsType = {
    title?: string;
    isVertical?: boolean;
    options?: OptionsType[];
    value?: string;

    disabled?: boolean;
    onChange?: (newProps: QuestionRadioPropsType) => void;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
    title: '单选',
    isVertical: false,
    options: [
        { value: 'option1', text: '选项1' },
        { value: 'option2', text: '选项2' },
        { value: 'option3', text: '选项3' },
    ],
    value: '',
};
