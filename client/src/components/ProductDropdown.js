import React, {useEffect, useState} from "react";
import {Dropdown, FormControl} from "react-bootstrap";
import {searchProductsByName} from "../http/productAPI";
import {debounce} from "lodash";

const ProductDropdown = ({onSelect}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]); // Гарантируем, что products - массив
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Функция поиска с debounce
    const fetchProducts = debounce(async (query) => {
        if (query.trim() === "") {
            setProducts([]); // Если поле пустое, очищаем список
            return;
        }

        try {
            const result = await searchProductsByName(query);
            setProducts(Array.isArray(result) ? result : []); // Гарантируем массив
        } catch (error) {
            console.error("Ошибка загрузки товаров:", error);
            setProducts([]);
        }
    }, 300);

    // Вызываем fetchProducts при изменении searchTerm
    useEffect(() => {
        fetchProducts(searchTerm);
    }, [searchTerm]);

    // Фильтруем результаты (если сервер вернул данные)
    useEffect(() => {
        setFilteredProducts(
            Array.isArray(products)
                ? products.filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : []
        );
    }, [products, searchTerm]);

    return (
        <Dropdown show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
            <Dropdown.Toggle variant="secondary">
                Выберите товар
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
                <FormControl
                    autoFocus
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Чтобы дропдаун не закрывался
                />
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Dropdown.Item key={product.id} onClick={() => onSelect(product)}>
                            {product.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProductDropdown;
