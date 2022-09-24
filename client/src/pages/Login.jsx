import React from 'react';
import axios from 'axios';

export const Login = () => {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (userInfo.email.length > 0 && userInfo.password.length > 0) {
            try {
                const { data: isIncludes } = await axios.get(
                    `http://localhost:8800/users/${userInfo.email}/${userInfo.password}`,
                );
                console.log(isIncludes ? 'success' : 'fail');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <form action="">
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={userInfo.email}
                    placeholder="email"
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={userInfo.password}
                    placeholder="password"
                    autoComplete="current-password"
                />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};
