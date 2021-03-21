import React, { useState } from 'react';
import { Typography, Form, Input, InputNumber, Select, Button } from 'antd';
import { LayoutContext } from 'antd/lib/layout/layout';
// Form, Icon,Menu,Input,Button,Divider,Row,Col,Text

// const { Title } = Typography;
const { Option } = Select;

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const btnLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const formItemRules = [{ required: true, message: 'This field is required' }];

function ExpenseForm(props) {
    const categories = [
        'Housing',
        'Transportation',
        'Food',
        'Utilities',
        'Medical',
        'Insurance',
        'Taxes',
        'Education',
        'Child Care',
        'Loan',
        'Personal Care',
        'Household Items',
        'Clothing',
        'Entertainment',
        'Travel',
        'Pets',
        'Gifts',
        'Donations',
        'Miscellaneous',
        'Others',
    ];

    const categoryOptionComponents = categories.map((category) => {
        return <Option value={category}>{category}</Option>;
    });

    return (
        <Form {...formLayout} onFinish={props.handleAddExpense}>
            <Form.Item
                label='Item Name/Description'
                name='desc'
                rules={formItemRules}>
                <Input />
            </Form.Item>
            <Form.Item label='Amount' name='amount' rules={formItemRules}>
                <InputNumber style={{ width: '100%' }} min='0' />
            </Form.Item>
            <Form.Item label='Category' name='category' rules={formItemRules}>
                <Select placeholder='Select a Category' allowClear>
                    {categoryOptionComponents}
                </Select>
            </Form.Item>
            <Form.Item {...btnLayout}>
                <Button type='primary' htmlType='submit'>
                    Add
                </Button>
            </Form.Item>
        </Form>
    );
}

export default ExpenseForm;
