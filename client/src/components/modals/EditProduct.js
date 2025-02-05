import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownMenu, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { fetchProducers, fetchProducts, fetchTypes, fetchOneProduct, updateProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const EditProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducers().then(data => product.setProducers(data));
        fetchProducts().then(data => product.setProducts(data.rows));
    }, []);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const handleProductSelect = async (productId) => {
        const data = await fetchOneProduct(productId);
        setSelectedProduct(data);
        setName(data.name);
        setPrice(Number(data.price) || 0);
        setInfo(data.info || []);
        product.setSelectedType(product.types.find(t => t.id === data.typeId) || {});
        product.setSelectedProducer(product.producers.find(p => p.id === data.producerId) || {});
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
    };

    const updateProductHandler = () => {
        console.log(`Selected product: ${JSON.stringify(selectedProduct)}`);
        const formData = new FormData();
        formData.append('id', selectedProduct.id);
        formData.append('name', name);
        formData.append('price', price ? price.toString() : '0');
        if (file) formData.append('img', file);
        formData.append('producerId', product.selectedProducer.id);
        formData.append('typeId', product.selectedType.id);
        formData.append('info', JSON.stringify(info));
        console.log(`formData.id: ${formData.id}`);
        updateProduct(formData, selectedProduct.id).then(data => onHide());
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{selectedProduct?.name || 'Выберите товар'}</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.products.map(prod =>
                                <Dropdown.Item onClick={() => handleProductSelect(prod.id)} key={prod.id}>{prod.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{product.selectedType.name || 'Выберите тип товара'}</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.types.map(type =>
                                <Dropdown.Item onClick={() => product.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{product.selectedProducer.name || 'Выберите производителя товара'}</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.producers.map(producer =>
                                <Dropdown.Item onClick={() => product.setSelectedProducer(producer)} key={producer.id}>{producer.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} className={'mt-3'}
                                  placeholder={'Название товара'} />
                    <Form.Control value={price} onChange={e => setPrice(e.target.value || 0)} className={'mt-3'}
                                  placeholder={'Стоимость товара'} type={'number'} />
                    <Form.Control className={'mt-3'} type={'file'} onChange={selectFile} />
                    <hr />
                    {
                        info.map(i =>
                            <Row className={'mt-3'} key={i.number}>
                                <Col md={4}>
                                    <Form.Control value={i.title}
                                                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                                  placeholder={'Название'} />
                                </Col>
                                <Col md={4}>
                                    <Form.Control value={i.description}
                                                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                                  placeholder={'Описание'} />
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
                <Button variant="outline-success" onClick={updateProductHandler}>
                    Изменить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditProduct;
