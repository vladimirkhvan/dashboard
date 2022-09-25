import React from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export const Dashboard = () => {
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

    const columns = [
        {
            name: 'Username',
            selector: (row) => row.username,
        },
        {
            name: 'Password',
            selector: (row) => row.password,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Created at',
            selector: (row) => row.createdAt.split('T')[0],
        },
        {
            name: 'Last Visit',
            selector: (row) => row.lastVisit.split('T')[0],
        },
        {
            name: 'Status',
            selector: (row) => row.status,
        },
        {
            name: 'Actions',
            selector: (row) => <button onClick={() => deleteUser(row.id)}>delete</button>,
        },
    ];

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete('http://localhost:8800/users/' + id);
            setUsersInfo((prevUsersInfo) => prevUsersInfo.filter((userInfo) => userInfo.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={style.dashboard}>
            <header>
                <Link to="/login" className={style.login}>
                    Sign In
                </Link>
                <Link to="/registration" className={style.register}>
                    Register
                </Link>
            </header>
            <main>
                <DataTable
                    columns={columns}
                    data={usersInfo}
                    direction="auto"
                    fixedHeaderScrollHeight="300px"
                    highlightOnHover
                    pagination
                    responsive
                    selectableRows
                    selectableRowsHighlight
                    subHeaderAlign="right"
                    subHeaderWrap
                    onSelectedRowsChange={handleChange}
                />
            </main>
        </div>
    );
};
