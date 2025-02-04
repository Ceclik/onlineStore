import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {deleteProducer} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteProducer = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeProducer = () => {
        deleteProducer(product.selectedProducer.id).then(data => setValue(''));
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить производителя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={'mt-2 mb-2'}>
                    <Dropdown.Toggle>{product.selectedProducer.name || 'Выберите производителя товара'}</Dropdown.Toggle>
                    <DropdownMenu>
                        {product.producers.map(producer =>
                            <Dropdown.Item onClick={() => product.setSelectedProducer(producer)}
                                           key={producer.id}>{producer.name}</Dropdown.Item>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={removeProducer}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteProducer;