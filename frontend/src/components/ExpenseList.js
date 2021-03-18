import React from 'react';
import { Divider, List, Space, Typography } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

const { Title, Text } = Typography;

function ExpenseList(props) {
    const { expensesList, deleteExpense } = props;
    return (
        <div className={expensesList.length !== 0 ? '' : 'centered'}>
            <List
                dataSource={expensesList}
                renderItem={(expense) => (
                    <List.Item key={expense._id}>
                        <List.Item.Meta
                            title={
                                <Title level={5}>
                                    {'Description : ' +
                                        expense.desc +
                                        ' | Amount Spent : ' +
                                        expense.amount}
                                </Title>
                            }
                            description={
                                <Text disabled>
                                    {' '}
                                    {'Category : ' + expense.category}
                                </Text>
                            }
                        />
                        <div>
                            <Space size='large' align='center'>
                                <Text>Date : {expense.date}</Text>
                                <DeleteTwoTone
                                    twoToneColor='#f40c0c'
                                    style={{ padding: '10px 0' }}
                                    onClick={(e) =>
                                        deleteExpense(e, expense._id)
                                    }
                                />
                            </Space>
                        </div>
                    </List.Item>
                )}
            />
            <Divider></Divider>
        </div>
    );
}

export default ExpenseList;
