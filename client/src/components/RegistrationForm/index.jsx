import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './RegistrationForm.module.scss';

export const RegistrationForm = ({nextPage}) => {
    const [userInfo, setUserInfo] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmationPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/users', userInfo);
            if (response.status === 409) {
                throw new Error('Duplicate email');
            } else {
                console.log(response);
                navigate(nextPage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister} className={style.registrationForm}>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={userInfo.username}
                    placeholder="username"
                    className={style.username}
                    required
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={userInfo.email}
                    placeholder="email"
                    className={style.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={userInfo.password}
                    placeholder="password"
                    autoComplete="current-password"
                    className={style.password}
                    required
                />
                <input
                    type="password"
                    name="confirmationPassword"
                    onChange={handleChange}
                    value={userInfo.confirmationPassword}
                    placeholder="confirmationPassword"
                    autoComplete="current-password"
                    className={style.password}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
