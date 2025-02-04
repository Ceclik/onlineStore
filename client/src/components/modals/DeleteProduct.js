import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {deleteProduct, deleteType} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteProduct = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeProduct = () => {
        deleteProduct(product.selectedProduct.id).then(data => setValue(''));
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={'mt-2 mb-2'}>
                    <Dropdown.Toggle>{product.selectedProduct.name || 'Выберите товар'}</Dropdown.Toggle>
                    <DropdownMenu>
                        {product.products.map(product1 =>
                            <Dropdown.Item onClick={() => product.setSelectedProduct(product1)}
                                           key={product1.id}>{product1.name}</Dropdown.Item>
                        )}
                    </DropdownMenu>
                </Dropdown>
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