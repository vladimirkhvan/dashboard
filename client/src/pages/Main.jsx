import React from 'react';
import axios from 'axios';

export const Main = () => {
    const [usersInfo, setUsersInfo] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const fetchUsers = async () => {
                try {
                    const { data } = await axios.get('http://localhost:8800/users');
                    setUsersInfo(data);
                } catch (error) {
                    console.log(error);
                }
            };

            await fetchUsers();
        })();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete('http://localhost:8800/users/' + id);
            setUsersInfo((prevUsersInfo) => prevUsersInfo.filter((userInfo) => userInfo.id !== id));
        } catch (error) {
            console.log(error)
        }
       
    };

    return (
        <div>
            {usersInfo.map((userInfo) => (
                <div key={userInfo.id}>
                    <h1>{userInfo.username}</h1>
                    <p>{userInfo.password}</p>
                    <button onClick={() => deleteUser(userInfo.id)}>delete</button>
                </div>
            ))}
        </div>
    );
};
