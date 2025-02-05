import React, {useContext, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteProduct, fetchOneProduct} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ProductDropdown from "../dropdown/ProductDropdown";

const DeleteProduct = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeProduct = () => {
        deleteProduct(product.selectedProduct.id).then(data => setValue(''));
        onHide();
    }

    const handleProductSelect = async (selected) => {
        if (!selected) return;

        try {
            const data = await fetchOneProduct(selected.id);
            product.setSelectedProduct(data);
        } catch (error) {
            console.error("Ошибка при получении данных о товаре:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<ProductDropdown onSelect={handleProductSelect}/>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={removeProduct}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteProduct;