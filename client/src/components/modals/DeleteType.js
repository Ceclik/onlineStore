import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {deleteType} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteType = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeType = () => {
        deleteType(product.selectedType.id).then(data => setValue(''));
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить производителя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={'mt-2 mb-2'}>
                    <Dropdown.Toggle>{product.selectedType.name || 'Выберите тип товара'}</Dropdown.Toggle>
                    <DropdownMenu>
                        {product.types.map(type =>
                            <Dropdown.Item onClick={() => product.setSelectedType(type)}
                                           key={type.id}>{type.name}</Dropdown.Item>
                        )}
                    </DropdownMenu>
                </Dropdown>
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