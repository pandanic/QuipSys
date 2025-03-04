import { FC, useEffect } from 'react';

import { Form, Input } from 'antd';

import { useDispatch } from 'react-redux';

import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { restPageInfo } from '../../../store/pageInfoReducer';

const PageSetting: FC = () => {
    const pageInfo = useGetPageInfo();
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(pageInfo);
    }, [pageInfo]);

    function handleFormChange() {
        dispatch(restPageInfo(form.getFieldsValue()));
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={pageInfo}
            onValuesChange={() => handleFormChange()}
        >
            <Form.Item
                name="title"
                label="问卷标题"
                rules={[{ required: true, message: '请输入标题!' }]}
            >
                <Input type="text" placeholder="请输入标题" />
            </Form.Item>
            <Form.Item name="desc" label="问卷描述">
                <Input.TextArea placeholder="请输入描述" />
            </Form.Item>
            <Form.Item name="js" label="脚本代码">
                <Input.TextArea placeholder="请输入脚本代码" />
            </Form.Item>
            <Form.Item name="css" label="样式代码">
                <Input.TextArea placeholder="请输入样式代码" />
            </Form.Item>
        </Form>
    );
};

export default PageSetting;
