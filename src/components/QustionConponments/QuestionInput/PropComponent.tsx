import { FC, useEffect } from 'react';

import { Form, Input } from 'antd';

import { QuestionInputPropsType } from './interface';

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { title, placeholder } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ title, placeholder });
    }, [title, placeholder]);
    return (
        <Form layout="vertical" initialValues={{ title, placeholder }}>
            <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="placeholder" label="placeholder">
                <Input />
            </Form.Item>
        </Form>
    );
};

export default PropComponent;
