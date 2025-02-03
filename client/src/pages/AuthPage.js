import React, {useContext, useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AuthPage = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    //const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const signIn = async () => {
        try {
            let data;
            data = await login(email, password);
            console.log(data);
            user.setUser(data);
            user.setIsAuth(true);
            navigate(ADMIN_ROUTE);
        }catch (e){
            alert(e.response.data.message);
        }
    }

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
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Пароль"
                    style={{borderRadius: "20px", border: "1px solid #ccc", padding: "10px"}}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn" style={{
                    width: "110px",
                    backgroundColor: "#A4E5B3",
                    borderRadius: "20px",
                    padding: "10px",
                }} onClick={/*TODO*/() => {
                    console.log('Enter button has been clicked');
                    signIn()
                }}>
                    Войти
                </button>
            </div>
        </div>
    );
});

export default AuthPage;