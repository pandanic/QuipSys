import { FC, useEffect } from 'react';

import { Form, Input } from 'antd';

import { QuestionInfoPropsType } from './interface';

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc, onChange, disabled } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ title, desc });
    }, [title, desc]);
    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ title, desc }}
            disabled={disabled}
            onValuesChange={handleValueChange}
        >
            <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="desc" label="段落文本">
                <Input.TextArea />
            </Form.Item>
        </Form>
    );
};
export default PropComponent;
