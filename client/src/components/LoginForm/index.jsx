import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './LoginForm.module.scss';

import clearIcon from '../../assets/images/clear.svg';

// TODO: place clearfield and handle change methods in utils

export const LoginForm = () => {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
    });

    const [isLoginError, setIsLoginError] = React.useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setIsLoginError(false);
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [e.target.name]: e.target.value }));
    };

    const clearField = (fieldName) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [fieldName]: '' }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data: isExist } = await axios.get(
                `http://localhost:8800/users/${userInfo.email}/${userInfo.password}`,
            );
            isExist ? navigate('/') : setIsLoginError(true);;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className={style.loginForm}>
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={userInfo.email}
                        placeholder="email"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('email')} />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userInfo.password}
                        placeholder="password"
                        autoComplete="current-password"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('password')} />
                </div>

                <p className={`${style.errorMessage} ` + (isLoginError ? '' : `${style.hide}`)}>Email or password are not matching. Try again</p>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};
