import React, { useState, useEffect } from 'react';
import { Layout, Typography, Menu, Button, Space } from 'antd';
// Form, Icon,Menu,Input,Button,Divider,Row,Col,Text

import Login from './Login';
import Expenses from './Expenses';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

function Main() {
    const [user, setUser] = useState(false);

    useEffect(() => {});

    // if (!user) {
    // }

    return (
        <Layout>
            <Header>
                <div className='header'>
                    <Title
                        level={3}
                        type='success'
                        style={{ padding: '10px 0' }}>
                        Expense Tracker
                    </Title>
                    {user ? (
                        <Button
                            type='danger'
                            onClick={() => {
                                setUser(false);
                            }}>
                            Logout
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
            </Header>
            <Content>
                <div className='container'>
                    <div className='centered'>
                        <Title>Expense Tracker</Title>
                        <Text disabled>
                            Track your expenses and save money.
                        </Text>
                    </div>
                    <BrowserRouter>
                        <Switch>
                            <Route path='/'>
                                {user ? (
                                    <Expenses user={user} />
                                ) : (
                                    <Login setUser={setUser} />
                                )}
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    );
}

export default Main;
