import { FC, useEffect } from 'react';

import { Button, Checkbox, Form, Input, Select, Space } from 'antd';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { nanoid } from '@reduxjs/toolkit';

import { OptionsType, QuestionRadioPropsType } from './interface';

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, isVertical, value, options = [], onChange, disabled } = { ...props };
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, value, options });
    }, [title, isVertical, value, options]);

    function handleValueChange() {
        if (onChange) {
            const newValue = form.getFieldsValue();
            const { options: opts = [] } = newValue;
            opts.forEach((item: OptionsType) => {
                if (item.value) return;
                item.value = nanoid();
            });
            onChange(newValue);
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ title, isVertical, value, options }}
            disabled={disabled}
            onValuesChange={handleValueChange}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入标题' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="选项">
                <Form.List name="options">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(({ key, name }, index) => {
                                    return (
                                        <Space key={key}>
                                            <Form.Item
                                                name={[name, 'text']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入选项文字',
                                                    },
                                                    {
                                                        validator: (_, text) => {
                                                            const { options: optionsValue = [] } =
                                                                form.getFieldsValue();
                                                            let num = 0;

                                                            optionsValue.forEach(
                                                                (item: OptionsType) => {
                                                                    if (item.text === text) {
                                                                        num++;
                                                                    }
                                                                },
                                                            );
                                                            console.log(num);
                                                            if (num > 1) {
                                                                return Promise.reject(
                                                                    new Error('选项文字不能重复'),
                                                                );
                                                            }

                                                            return Promise.resolve();
                                                        },
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="请输入选项文字...." />
                                            </Form.Item>
                                            {index > 1 && (
                                                <Form.Item>
                                                    <Button
                                                        onClick={() => remove(name)}
                                                        icon={<DeleteOutlined />}
                                                        shape="circle"
                                                        block
                                                    />
                                                </Form.Item>
                                            )}
                                        </Space>
                                    );
                                })}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add({ text: '新增选项', value: '' })}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        添加选项
                                    </Button>
                                </Form.Item>
                            </>
                        );
                    }}
                </Form.List>
            </Form.Item>

            <Form.Item label="默认选中" name="value">
                <Select
                    value={value}
                    allowClear
                    options={options.map((item) => {
                        return {
                            value: item.value,
                            label: item.text || '',
                        };
                    })}
                />
            </Form.Item>

            <Form.Item name="isVertical" valuePropName="checked">
                <Checkbox>是否竖向排列</Checkbox>
            </Form.Item>
        </Form>
    );
};
export default PropComponent;
