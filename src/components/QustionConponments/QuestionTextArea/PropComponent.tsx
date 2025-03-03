import { FC, useEffect } from 'react';

import { Form, Input } from 'antd';

import { QuestionTextAreaPropsType } from './interface';

const PropComponent: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
    const { title, placeholder, onChange, disabled } = props;
    const [form] = Form.useForm();

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }
    useEffect(() => {
        form.setFieldsValue({ title, placeholder });
    }, [title, placeholder]);
    return (
        <Form
            disabled={disabled}
            layout="vertical"
            initialValues={{ title, placeholder }}
            form={form}
            onValuesChange={handleValueChange}
        >
            <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="placeholder" label="placeholder">
                <Input.TextArea />
            </Form.Item>
        </Form>
    );
};

export default PropComponent;
