import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, DropdownMenu, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

const CreateProduct = ({show, onHide}) => {
    const {product} = useContext(Context);
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>Выберите тип товара</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.types.map(type =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>Выберите производителя товара</Dropdown.Toggle>
                        <DropdownMenu>
                            {product.producers.map(producer =>
                                <Dropdown.Item key={producer.id}>{producer.name}</Dropdown.Item>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control className={'mt-3'} placeholder={'Название товара'}/>
                    <Form.Control className={'mt-3'} placeholder={'Стоимость товара'} type={'number'}/>
                    <Form.Control className={'mt-3'} type={'file'}/>
                    <hr/>
                    <Button variant={'outline-dark'} onClick={addInfo}>Добавить новое свойство</Button>

                    {
                        info.map(i =>
                            <Row className={'mt-3'} key={i.number}>
                                <Col md={4}>
                                    <Form.Control placeholder={'Название'} />
                                </Col>
                                <Col md={4}>
                                    <Form.Control placeholder={'Описание'} />
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
                <Button variant="outline-success" onClick={onHide}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;