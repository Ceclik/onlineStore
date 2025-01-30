import React from 'react';
import {Container} from "react-bootstrap";

const AuthPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
                   style={{backgroundColor: "#f0f0f0", height: window.innerHeight - 100}}>
            <div className="p-4 rounded" style={{
                backgroundColor: "#d3d3d3",
                borderRadius: "20px",
                padding: "30px",
                width: "350px",
                textAlign: "center"
            }}>
                <h2 style={{color: "#800080", fontFamily: "'Francois One', sans-serif"}}>Авторизация</h2>
                <input
                    type="email"
                    className="form-control my-2"
                    placeholder="email"
                    style={{borderRadius: "20px", border: "1px solid #ccc", padding: "10px"}}
                />
                <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Пароль"
                    style={{borderRadius: "20px", border: "1px solid #ccc", padding: "10px"}}
                />
                <button className="btn" style={{
                    width: "110px",
                    backgroundColor: "#A4E5B3",
                    borderRadius: "20px",
                    padding: "10px",
                }} onClick={/*TODO*/() => console.log('Enter button has been clicked')}>
                    Войти
                </button>
            </div>
        </div>
    );
};

export default AuthPage;