import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {createProducer} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateProducer = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const addProducer = () => {
        createProducer({name: value, typeId: product.selectedType.id}).then(data => setValue(''));
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить производителя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Название производителя"}
                    />
                </Form>
                <Dropdown className={'mt-3 mb-3'}>
                    <Dropdown.Toggle>{product.selectedType.name || 'Выберите тип производимых товаров'}</Dropdown.Toggle>
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
                <Button variant="outline-success" onClick={addProducer}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProducer;