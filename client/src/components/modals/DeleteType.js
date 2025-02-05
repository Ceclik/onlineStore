import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {deleteType, fetchOneProduct, fetchOneType} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ProductDropdown from "../dropdown/ProductDropdown";
import TypeDropdown from "../dropdown/TypeDropdown";

const DeleteType = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeType = () => {
        deleteType(product.selectedType.id).then(data => setValue(''));
        onHide();
    }

    const handleTypeSelect = async (selected) => {
        if (!selected) return;

        try {
            const data = await fetchOneType(selected.id);
            product.setSelectedType(data)
        } catch (error) {
            console.error("Ошибка при получении данных о товаре:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить Тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<TypeDropdown onSelect={handleTypeSelect} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={removeType}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;