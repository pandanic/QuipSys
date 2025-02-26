import { FC } from 'react';
import { Button, Form, Input, Space, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import styles from './Register.module.scss';

const { Title } = Typography;

export const Register: FC = () => {
    function onFinish(values: any) {
        console.log(values);
    }

    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined />
                    </Title>
                    <Title level={2}>注册新用户</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
                    <Form.Item label="用户名" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password">
                        <Input.Password autoComplete="false" />
                    </Form.Item>
                    <Form.Item label="确认密码" name="confirm">
                        <Input.Password autoComplete="false" />
                    </Form.Item>
                    <Form.Item label="名称" name="nickname">
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to="/login">已有账户?请登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
