import React from 'react';
import { Form, Input, Button, Divider, Space } from 'antd';

function LoginForm(props) {
    return (
        <Form
            {...props.formLayout}
            name='loginForm'
            initialValues={{ remember: true }}
            onFinish={props.handleLogin}>
            <Divider orientation='center'>Login</Divider>
            <Form.Item
                label='Username'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                <Input.Password />
            </Form.Item>

            <Form.Item {...props.btnLayout}>
                <Space>
                    <Button type='primary' htmlType='submit'>
                        Login
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => props.setLogin(false)}>
                        Sign Up
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
