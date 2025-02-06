import React, {useContext, useState} from "react";
import {Container, Navbar} from "react-bootstrap";
import {Context} from "../index";
import {SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {searchProductsByName} from "../http/productAPI";
import "../styles/fonts.css";

const NavBar = observer(() => {
    const { product } = useContext(Context);
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = async () => {
        product.setSearchQuery(searchInput); // Обновляем состояние поиска в MobX
        if (searchInput.trim()) {
            const searchResults = await searchProductsByName(searchInput);
            product.setProducts(searchResults); // Загружаем найденные товары
        }
    };

    return (
        <nav className="navbar px-3 py-2" style={{ backgroundColor: "#eee", borderRadius: "20px" }}>
            <Container>
            <Navbar.Brand href={SHOP_ROUTE} className="fw-bold" style={{
                color: "#800080",
                fontSize: 32,
                fontFamily: "HooskaiChamferedSquare, sans-serif"
            }}>Сандрик</Navbar.Brand>

            <div className="d-flex align-items-center" style={{ marginRight: "15px" }}>
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Название товара"
                    style={{ width: "290px", borderRadius: "30px", border: "1px solid #ccc" }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn"
                        style={{ width: "130px", backgroundColor: "#A4E5B3", borderRadius: "20px" }}
                        onClick={handleSearch}>Искать
                </button>
            </div>
            </Container>
        </nav>
    );
});

export default NavBar;
