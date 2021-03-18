import React from 'react';
import { Form, Input, Button, Divider, Space } from 'antd';

function SignUpForm(props) {
    return (
        <Form
            {...props.formLayout}
            name='signupForm'
            initialValues={{ remember: true }}
            onFinish={props.handleSignUp}>
            <Divider orientation='center'>Signup</Divider>
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

            <Form.Item
                label='Confirm Password'
                name='repeatPassword'
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
                        Sign Up
                    </Button>
                    <Button type='primary' onClick={() => props.setLogin(true)}>
                        Login
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default SignUpForm;
