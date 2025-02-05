import React, {useContext, useEffect, useState} from "react";
import {Dropdown, FormControl} from "react-bootstrap";
import {searchProductsByName} from "../../http/productAPI";
import {debounce} from "lodash";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProductDropdown = observer(({onSelect}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = debounce(async (query) => {
        if (query.trim() === "") {
            setProducts([]);
            return;
        }

        try {
            const result = await searchProductsByName(query);
            setProducts(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Ошибка загрузки товаров:", error);
            setProducts([]);
        }
    }, 300);

    useEffect(() => {
        fetchProducts(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setFilteredProducts(
            Array.isArray(products)
                ? products.filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : []
        );
    }, [products, searchTerm]);

    const handleSelect = (product) => {
        setSelectedProduct(product);
        onSelect(product);
        setIsDropdownOpen(false);
    };

    return (
        <Dropdown className={"mt-2 mb-2"} show={isDropdownOpen} onToggle={(isOpen) => setIsDropdownOpen(isOpen)}>
            <Dropdown.Toggle variant="secondary">
                {selectedProduct ? selectedProduct.name : 'Выберите товар'}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{maxHeight: "200px", overflowY: "auto"}}>
                <FormControl
                    autoFocus
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Dropdown.Item key={product.id} onClick={() => handleSelect(product)}>
                            {product.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Ничего не найдено</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default ProductDropdown;
