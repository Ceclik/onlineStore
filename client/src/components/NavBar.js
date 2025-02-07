import React, { useContext, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Context } from "../index";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { searchProductsByName } from "../http/productAPI";
import { useLocation } from "react-router-dom"; // Импортируем useLocation
import "../styles/fonts.css";

const NavBar = observer(() => {
    const { product } = useContext(Context);
    const [searchInput, setSearchInput] = useState("");
    const location = useLocation(); // Получаем текущий путь

    const handleSearch = async () => {
        product.setSearchQuery(searchInput);
        if (searchInput.trim()) {
            const searchResults = await searchProductsByName(searchInput);
            product.setProducts(searchResults);
        }
    };

    return (
        <nav className="navbar px-3 py-2" style={{ backgroundColor: "#eee", borderRadius: "20px" }}>
            <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                <Navbar.Brand href={SHOP_ROUTE} className="fw-bold" style={{
                    color: "#800080",
                    fontSize: 32,
                    fontFamily: "HooskaiChamferedSquare, sans-serif"
                }}>Сандрик</Navbar.Brand>

                {/* Отображаем поиск только на главной странице */}
                {location.pathname === SHOP_ROUTE && (
                    <div className="d-flex flex-column flex-sm-row align-items-center w-100 mt-2 mt-md-0" style={{ maxWidth: "500px" }}>
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Название товара"
                            style={{ width: "100%", borderRadius: "30px", border: "1px solid #ccc" }}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="btn mt-2 mt-sm-0"
                                style={{ width: "100%", maxWidth: "130px", backgroundColor: "#A4E5B3", borderRadius: "20px" }}
                                onClick={handleSearch}>Искать
                        </button>
                    </div>
                )}
            </Container>
        </nav>
    );
});

export default NavBar;
