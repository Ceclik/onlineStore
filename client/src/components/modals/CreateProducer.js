import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createProducer, fetchOneType} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import TypeDropdown from "../dropdown/TypeDropdown";

const CreateProducer = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const addProducer = () => {
        createProducer({name: value, typeId: product.selectedType.id}).then(data => setValue(''));
        onHide();
    }

    const handleTypeSelect = async (selected) => {
        if (!selected) return;

        try {
            const data = await fetchOneType(selected.id);
            console.log(`data: ${JSON.stringify(data)}`);
            product.setSelectedType(data)
        } catch (error) {
            console.error("Ошибка при получении данных о товаре:", error);
        }
    };

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
                {<TypeDropdown onSelect={handleTypeSelect}/>}
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