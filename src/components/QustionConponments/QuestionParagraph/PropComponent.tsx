import { FC, useEffect } from 'react';

import { Checkbox, Form, Input } from 'antd';

import { QuestionParagraphPropsType } from './interface';

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text, onChange, disabled, isCenter } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ text, isCenter });
    }, [text, isCenter]);
    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ text, isCenter }}
            disabled={disabled}
            onValuesChange={handleValueChange}
        >
            <Form.Item
                name="text"
                label="段落文本"
                rules={[{ required: true, message: '请输入文本' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="isCenter" valuePropName="checked" label="是否居中">
                <Checkbox>是否居中</Checkbox>
            </Form.Item>
        </Form>
    );
};
export default PropComponent;
