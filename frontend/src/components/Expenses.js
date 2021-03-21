import React, { useState, useEffect } from 'react';
import { Typography, Divider, DatePicker, Popover, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
// Form, Icon,Menu,Input,Button,Divider,Row,Col,Text
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseStats from './ExpenseStats';

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

function Expenses(props) {
    const [expensesList, setExpensesList] = useState([]);
    const [startDate, setStartDate] = useState(moment().format('DD-MM-YYYY'));
    const [endDate, setEndDate] = useState(moment().format('DD-MM-YYYY'));

    useEffect(() => {});

    const getExpenses = async () => {
        const dailyExpenses = await axios.post(
            'http://localhost:4000/et/expenses/get',
            { dates: { start: startDate, end: endDate }, user: props.user }
        );
        if (dailyExpenses.data) {
            setExpensesList(dailyExpenses.data.expenses);
        }
    };

    const handleAddExpense = async (data) => {
        const now = moment().format('DD-MM-YYYY');
        const expenseData = { User: props.user._id, ...data, date: now };
        const res = await axios.post('http://localhost:4000/et/expenses', {
            data: expenseData,
        });
        if (res.err) {
            alert('Error : ' + res.err);
        }
        getExpenses();
    };

    const onCalenderChange = (value) => {
        const now = moment().format('DD-MM-YYYY');
        if (value === null) {
            setStartDate(now);
            setEndDate(now);
            return;
        }
        //  todays date
        const start = moment(value[0]).format('DD-MM-YYYY');
        const end = moment(value[1]).format('DD-MM-YYYY');
        if (start <= now && end <= now) {
            setStartDate(start);
            setEndDate(end);
        } else {
            alert('Choose the right dates.');
        }
        // console.log(moment(value).format('DD-MM-YYYY'));
        console.log('RN :');
    };

    const deleteExpense = async (e, _id) => {
        const res = await axios.delete('http://localhost:4000/et/expenses', {
            data: { _id: _id },
        });
        if (res.err) {
            alert(res.err);
        }
        getExpenses();
    };

    const dateFilterInfo = () => {
        return (
            <Text>
                Select the start date and end date to get the expenses during
                the time.
            </Text>
        );
    };

    return (
        <div className='fullHeight'>
            <div className='container centered'>
                <Title level={2}>Welcome, {props.user.username}</Title>
                <Divider>Statistics</Divider>
                <ExpenseStats
                    expensesList={expensesList}
                    startDate={startDate}
                    endDate={endDate}
                />
                <Divider>Add an Expense</Divider>
                <ExpenseForm handleAddExpense={handleAddExpense} />
                <Divider>Filter Expenses</Divider>
                <Popover
                    trigger='hover'
                    content={dateFilterInfo}
                    title='Filter Expenses'>
                    <div className='filters'>
                        <RangePicker onChange={onCalenderChange} />
                        <div className='centered'>
                            <Button onClick={getExpenses}>Get Data</Button>
                        </div>
                    </div>
                </Popover>
            </div>
            <ExpenseList
                expensesList={expensesList}
                deleteExpense={deleteExpense}
            />
        </div>
    );
}

export default Expenses;
