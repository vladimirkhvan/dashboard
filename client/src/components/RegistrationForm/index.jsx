import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './RegistrationForm.module.scss';

import clearIcon from '../../assets/images/clear.svg';

export const RegistrationForm = () => {
    const [userInfo, setUserInfo] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmationPassword: '',
    });

    const [isExist, setIsExist] = React.useState(false);

    const hideStyle = userInfo.password === userInfo.confirmationPassword ? `${style.hide}` : '';

    const navigate = useNavigate();

    const handleChange = (e) => {
        setIsExist(false);
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [e.target.name]: e.target.value }));
    };

    const clearField = (fieldName) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [fieldName]: '' }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/users', userInfo);
            navigate('/login');
        } catch (error) {
            if (error.response.status === 409) {
                setIsExist(true);
            }
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister} className={style.registrationForm}>
                <div className={style.username}>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={userInfo.username}
                        placeholder="Enter name"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('username')} />
                </div>
                <div className={style.email}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={userInfo.email}
                        placeholder="Enter email"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('email')} />
                </div>
                <div className={style.password}>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userInfo.password}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                    />
                    <img src={clearIcon} alt="clear" onClick={() => clearField('password')} />
                </div>
                <div className={style.password}>
                    <input
                        type="password"
                        name="confirmationPassword"
                        onChange={handleChange}
                        value={userInfo.confirmationPassword}
                        placeholder="Confirm password"
                        autoComplete="current-password"
                        required
                    />
                    <img
                        src={clearIcon}
                        alt="clear"
                        onClick={() => clearField('confirmationPassword')}
                    />
                </div>
                <p className={`${style.errorMessage} ` + hideStyle}>Passwords are not matching</p>
                <p className={`${style.errorMessage} ` + (isExist ? ' ' : ` ${style.hide}`)}>
                    Email exists in database
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
