import React from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";

const ProductPage = () => {
    const product = {
        id: 1,
        name: "Соломенный веник",
        price: 51,
        rating: 8,
        img: "",
        producerId: 1,
        typeId: 1,
        countryId: 1
    }
    const description = [
        {id: 1, title: "Скрок службы", description: "54"},
        {id: 1, title: "Скрок службы", description: "54"},
        {id: 1, title: "Скрок службы", description: "54"},
        {id: 1, title: "Скрок службы", description: "54"}
    ]

    return (
        <Container className={"mt-3"}>
            <Col md={4}>
                <Image width={300} height={300} src={product.img}/>
            </Col>
            <Col md={4}>
                <Row>
                    <h2>
                        {product.name}
                    </h2>
                </Row>
            </Col>
            <Col md={4}>
                <Card className={"d-flex flex-column align-items-center justify-content-around"}
                      style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                    <h3>{product.price + ' BYN'}</h3>
                </Card>
            </Col>
            <Row>
                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id} className={"d-flex flex-column m-3"} style={{background: (index % 2 === 0 ? 'lightgray' : 'transparent'), padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default ProductPage;