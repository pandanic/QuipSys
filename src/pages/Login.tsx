import { UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd';
import { FC } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';

import { loginUserService } from '../services/user';

import { setToken } from '../utils/user-token';

import styles from './Login.module.scss';

const { Title } = Typography;
export const Login: FC = () => {
    const nav = useNavigate();

    const { run } = useRequest(
        async (values) => {
            const { username, password } = values;
            const data = await loginUserService(username, password);
            return data;
        },
        {
            manual: true,
            onSuccess(res) {
                message.success('登录成功');
                setToken(res.token);
                nav('/manage/list');
            },
        },
    );

    function onFinish(values: any) {
        run(values);
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>用户登录</Title>
                </Space>
            </div>
            <div>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 26 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item label="用户名" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password">
                        <Input.Password autoComplete="false" />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ span: 26, offset: 6 }}
                    >
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 26, offset: 6 }}>
                        <Space>
                            <Button htmlType="submit" type="primary">
                                登录
                            </Button>
                            <Link to="/register">没账户?点击注册</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
