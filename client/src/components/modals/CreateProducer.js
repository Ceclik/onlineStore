import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createProducer} from "../../http/productAPI";

const CreateProducer = ({show, onHide}) => {

    const [value, setValue] = useState('');
    const addProducer = () => {
        createProducer({name: value}).then(data => setValue(''));
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
};

export default CreateProducer;