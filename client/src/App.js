import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Main } from './pages/Main';
import React from 'react';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
