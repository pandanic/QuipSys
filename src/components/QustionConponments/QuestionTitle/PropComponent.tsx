import { FC, useEffect } from 'react';

import { Checkbox, Form, Input, Select } from 'antd';

import { QuestionTitlePropsType } from './interface';

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { text, level, isCenter } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter });
    }, [text, level, isCenter]);
    return (
        <Form layout="vertical" initialValues={{ text, level, isCenter }}>
            <Form.Item name="text" label="文本" rules={[{ required: true, message: '请输入文本' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="level" label="level">
                <Select
                    options={[
                        { value: 1, text: 1 },
                        { value: 2, text: 2 },
                        { value: 3, text: 3 },
                    ]}
                />
            </Form.Item>
            <Form.Item name="isCenter" label="是否居中" valuePropName="checked">
                <Checkbox />
            </Form.Item>
        </Form>
    );
};

export default PropComponent;
