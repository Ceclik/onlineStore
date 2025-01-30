import React, {useContext} from 'react';
import {Navbar} from "react-bootstrap";
import {Context} from "../index";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import "../styles/fonts.css"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <nav className="navbar px-3 py-2" style={{backgroundColor: "#eee", borderRadius: "20px"}}>
            <Navbar.Brand href={SHOP_ROUTE} className="fw-bold" style={{
                color: "#800080",
                fontSize: 32,
                fontFamily: "HooskaiChamferedSquare, sans-serif"
            }}>Сандрик</Navbar.Brand>
            <div className="d-flex align-items-center" style={{marginRight: "15px"}}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Название товара"
                    style={{width: "290px", borderRadius: "30px", border: "1px solid #ccc"}}
                />
                <button className="btn"
                        style={{width: "130px", backgroundColor: "#A4E5B3", borderRadius: "20px"}}
                        onClick={/*TODO*/() => console.log('Search button is pressed!')}>Искать
                </button>
            </div>
        </nav>
    );
});

export default NavBar;