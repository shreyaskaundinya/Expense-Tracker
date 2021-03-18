import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
// Form, Icon,Menu,Input,Button,Divider,Row,Col,Text

import axios from 'axios';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const btnLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

function Login(props) {
    const [wantLogin, setLogin] = useState(true);

    const handleLogin = async (data) => {
        const res = await axios.post('http://localhost:4000/et/login', {
            data: data,
        });
        if (res.data.err) {
            alert('Error : ' + res.data.err);
        } else {
            console.log('Logged In');
            props.setUser(res.data.user);
        }
    };

    const handleSignUp = async (data) => {
        const res = await axios.post('http://localhost:4000/et/signup', {
            data: data,
        });
        if (res.data.err) {
            alert('Error : ' + res.data.err);
        } else {
            console.log(res.data.user);
            setLogin(true);
        }
    };

    return (
        <div className='fullHeight container centered'>
            {wantLogin ? (
                <LoginForm
                    formLayout={formLayout}
                    btnLayout={btnLayout}
                    setLogin={setLogin}
                    handleLogin={handleLogin}
                />
            ) : (
                <SignUpForm
                    formLayout={formLayout}
                    btnLayout={btnLayout}
                    setLogin={setLogin}
                    handleSignUp={handleSignUp}
                />
            )}
        </div>
    );
}

export default Login;
