import React, { useState, useEffect } from 'react';
import { Statistic, Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

function ExpenseList(props) {
    const { expensesList } = props;
    const [amtSpent, setAmtSpent] = useState(0);

    const calcAmtSpent = () => {
        var total = 0;
        for (const expense of expensesList) {
            total += expense.amount;
        }
        setAmtSpent(total);
    };

    useEffect(() => {
        calcAmtSpent();
    });
    return (
        <div className='centered'>
            <Row gutter={16}>
                <Col span={24}>
                    <Card>
                        <Statistic
                            title='Amount Spent'
                            value={amtSpent}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={'Rs.'}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ExpenseList;
