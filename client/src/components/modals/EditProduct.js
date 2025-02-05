import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, DropdownMenu, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import {
    fetchOneProduct,
    fetchProducers,
    fetchProducts,
    fetchTypes,
    updateProduct
} from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import ProductDropdown from "../dropdown/ProductDropdown";

const EditProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [searchType, setSearchType] = useState("");
    const [searchProducer, setSearchProducer] = useState("");

    useEffect(() => {
        fetchTypes().then((data) => product.setTypes(data));
        fetchProducers().then((data) => product.setProducers(data));
        fetchProducts().then((data) => product.setProducts(data.rows));
    }, []);

    const handleProductSelect = async (selected) => {
        if (!selected) return;

        try {
            const data = await fetchOneProduct(selected.id);
            setSelectedProduct(data);
            setName(data.name);
            setPrice(Number(data.price) || 0);
            setInfo(data.info || []);

            // Выбираем соответствующий тип и производителя
            const selectedType = product.types.find((t) => t.id === data.typeId) || {};
            const selectedProducer = product.producers.find((p) => p.id === data.producerId) || {};
            product.setSelectedType(selectedType);
            product.setSelectedProducer(selectedProducer);
        } catch (error) {
            console.error("Ошибка при получении данных о товаре:", error);
        }
    };

    const updateProductHandler = () => {
        if (!selectedProduct) return;

        const formData = new FormData();
        formData.append("id", selectedProduct.id);
        formData.append("name", name);
        formData.append("price", `${price}`);
        if (file) formData.append("img", file);
        formData.append("producerId", product.selectedProducer.id);
        formData.append("typeId", product.selectedType.id);
        formData.append("info", JSON.stringify(info));

        updateProduct(formData).then(() => onHide());
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ProductDropdown onSelect={handleProductSelect} />

                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>
                            {product.selectedType.name || "Выберите тип товара"}
                        </Dropdown.Toggle>
                        <DropdownMenu>
                            <Form.Control
                                className="m-2"
                                placeholder="Поиск типа..."
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            {product.types
                                .filter((t) =>
                                    t.name.toLowerCase().includes(searchType.toLowerCase())
                                )
                                .map((type) => (
                                    <Dropdown.Item
                                        onClick={() => product.setSelectedType(type)}
                                        key={type.id}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>
                            {product.selectedProducer.name || "Выберите производителя"}
                        </Dropdown.Toggle>
                        <DropdownMenu>
                            <Form.Control
                                className="m-2"
                                placeholder="Поиск производителя..."
                                value={searchProducer}
                                onChange={(e) => setSearchProducer(e.target.value)}
                            />
                            {product.producers
                                .filter((p) =>
                                    p.name.toLowerCase().includes(searchProducer.toLowerCase())
                                )
                                .map((producer) => (
                                    <Dropdown.Item
                                        onClick={() => product.setSelectedProducer(producer)}
                                        key={producer.id}
                                    >
                                        {producer.name}
                                    </Dropdown.Item>
                                ))}
                        </DropdownMenu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={"mt-3"}
                        placeholder={"Название товара"}
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value) || 0)}
                        className={"mt-3"}
                        placeholder={"Стоимость товара"}
                        type={"number"}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={() =>
                            setInfo([...info, { title: "", description: "", number: Date.now() }])
                        }
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map((i) => (
                        <Row className={"mt-3"} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) =>
                                        setInfo(
                                            info.map((item) =>
                                                item.number === i.number
                                                    ? { ...item, title: e.target.value }
                                                    : item
                                            )
                                        )
                                    }
                                    placeholder={"Название"}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) =>
                                        setInfo(
                                            info.map((item) =>
                                                item.number === i.number
                                                    ? { ...item, description: e.target.value }
                                                    : item
                                            )
                                        )
                                    }
                                    placeholder={"Описание"}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() =>
                                        setInfo(info.filter((item) => item.number !== i.number))
                                    }
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={updateProductHandler}>
                    Изменить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditProduct;
