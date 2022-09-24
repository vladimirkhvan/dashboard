import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('hello, i am back');
});

app.get('/users', (req, res) => {
    const q = 'SELECT * FROM users';
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

function getFullDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
}

app.post('/users', (req, res) => {
    const q =
        'INSERT INTO users (`username`, `password`, `email`, `createdAt`, `lastVisit`, `status`) VALUES (?)';

    const values = [
        req.body.username,
        req.body.password,
        req.body.email,
        getFullDate(),
        getFullDate(),
        'active',
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(409).json(err);
        }

        return res.json('User was added successfully');
    });
});

app.get('/users/:email/:password', (req, res) => {
    const userEmail = req.params.email;
    const userPassword = req.params.password;
    const q = 'SELECT id FROM test.users WHERE email=? and password=?';
    db.query(q, [userEmail, userPassword], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return data.length > 0 ? res.json(true) : res.json(false);
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const q = 'DELETE FROM users WHERE id = ?';
    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json('user has been deleted');
    });
});

app.listen(8800, () => {
    console.log('hi there lol ');
});
