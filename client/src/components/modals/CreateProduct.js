import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, DropdownMenu, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, fetchOneType, fetchProducers, fetchProducts, fetchTypes} from "../../http/productAPI";
import {observer} from "mobx-react-lite";
import TypeDropdown from "../dropdown/TypeDropdown";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducers().then(data => product.setProducers(data));
        fetchProducts().then(data => product.setProducts(data.rows));
    }, []);

    const [info, setInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
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

    const addProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('producerId', product.selectedProducer.id);
        formData.append('typeId', product.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createProduct(formData).then(data => onHide());
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <TypeDropdown onSelect={handleTypeSelect} />

                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{product.selectedProducer.name || 'Выберите производителя товара'}</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.producers.map(producer =>
                                <Dropdown.Item onClick={() => product.setSelectedProducer(producer)}
                                               key={producer.id}>{producer.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} className={'mt-3'}
                                  placeholder={'Название товара'}/>
                    <Form.Control value={price} onChange={e => setPrice(e.target.value)} className={'mt-3'}
                                  placeholder={'Стоимость товара'} type={'number'}/>
                    <Form.Control className={'mt-3'} type={'file'} onChange={selectFile}/>
                    <hr/>
                    <Button variant={'outline-dark'} onClick={addInfo}>Добавить новое свойство</Button>

                    {
                        info.map(i =>
                            <Row className={'mt-3'} key={i.number}>
                                <Col md={4}>
                                    <Form.Control value={i.title}
                                                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                                  placeholder={'Название'}/>
                                </Col>
                                <Col md={4}>
                                    <Form.Control value={i.description}
                                                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                                  placeholder={'Описание'}/>
                                </Col>
                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={() => removeInfo(i.number)}>Удалить</Button>
                                </Col>
                            </Row>
                        )
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addProduct}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;