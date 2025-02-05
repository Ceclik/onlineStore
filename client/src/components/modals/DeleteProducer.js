import React, {useContext, useState} from 'react';
import {Button, Dropdown, DropdownMenu, Form, Modal} from "react-bootstrap";
import {deleteProducer, fetchOneProducer, fetchOneType} from "../../http/productAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
    import ProducerDropdown from "../dropdown/ProducerDropdown";

const DeleteProducer = observer(({show, onHide}) => {

    const {product} = useContext(Context);
    const [value, setValue] = useState('');
    const removeProducer = () => {
        console.log(`selected producer before deleting: ${JSON.stringify(product.selectedProducer)}`);
        deleteProducer(product.selectedProducer.id).then(data => setValue(''));
        onHide();
    }

    const handleProducerSelect = async (selected) => {
        if (!selected) return;
        try {
            const data = await fetchOneProducer(selected.id);
            product.setSelectedProducer(data)
        } catch (error) {
            console.error("Ошибка при получении данных о производителе:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Удалить производителя</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<ProducerDropdown onSelect={handleProducerSelect} />}
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