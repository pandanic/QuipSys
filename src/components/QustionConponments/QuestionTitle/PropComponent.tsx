import { FC, useEffect } from 'react';

import { Checkbox, Form, Input, Select } from 'antd';

import { QuestionTitlePropsType } from './interface';

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { text, level, isCenter, onChange, disabled } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ text, level, isCenter });
    }, [text, level, isCenter]);

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue());
        }
    }
    return (
        <Form
            disabled={disabled}
            layout="vertical"
            initialValues={{ text, level, isCenter }}
            form={form}
            onValuesChange={handleValueChange}
        >
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
            <Form.Item name="isCenter" valuePropName="checked">
                <Checkbox>是否居中</Checkbox>
            </Form.Item>
        </Form>
    );
};

export default PropComponent;
