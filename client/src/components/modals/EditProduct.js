import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, DropdownMenu, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import {
    fetchOneProducer,
    fetchOneProduct, fetchOneType,
    fetchProducers,
    fetchProducts,
    fetchTypes,
    updateProduct
} from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import ProductDropdown from "../dropdown/ProductDropdown";
import TypeDropdown from "../dropdown/TypeDropdown";
import ProducerDropdown from "../dropdown/ProducerDropdown";

const EditProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

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

            const selectedType = product.types.find((t) => t.id === data.typeId) || null;
            const selectedProducer = product.producers.find((p) => p.id === data.producerId) || null;
            product.setSelectedType(selectedType);
            product.setSelectedProducer(selectedProducer);
        } catch (error) {
            console.error("Ошибка при получении данных о товаре:", error);
        }
    };

    const handleTypeSelect = (selected) => {
        if (selected) {
            product.setSelectedType(selected);
        }
    };

    const handleProducerSelect = (selected) => {
        if (selected) {
            product.setSelectedProducer(selected);
        }
    };

    const updateProductHandler = () => {
        if (!selectedProduct) return;

        const formData = new FormData();
        formData.append("id", selectedProduct.id);
        formData.append("name", name);
        formData.append("price", `${price}`);
        if (file) formData.append("img", file);
        formData.append("producerId", product.selectedProducer?.id || "");
        formData.append("typeId", product.selectedType?.id || "");
        formData.append("info", JSON.stringify(info));

        updateProduct(formData, selectedProduct.id).then(() => onHide());
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ProductDropdown onSelect={handleProductSelect} />
                    <TypeDropdown onSelect={handleTypeSelect} selected={product.selectedType} />
                    <ProducerDropdown onSelect={handleProducerSelect} selected={product.selectedProducer} />

                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={"mt-3"}
                        placeholder={"Название товара"}
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value || 0)}
                        className={"mt-3"}
                        placeholder={"Стоимость товара"}
                        type={"number"}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
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
