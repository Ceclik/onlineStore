import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";

const ProductPage = () => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, [id]);

    return (
        <Container className="mt-3">
            <Row className="d-flex align-items-start">
                {/* Левая колонка с изображением и названием */}
                <Col md={4}  className="d-flex flex-column align-items-center">
                    <h3 className="mb-3 font-weight-bold text-center" style={{fontSize: 35}}>{product.name}</h3>
                    <Image width={450} height={450} src={process.env.REACT_APP_API_URL + product.image} />
                </Col>

                {/* Центральная колонка с характеристиками */}
                <Col className={"ms-5 me-0"}>
                    <h4 className="font-weight-bold" style={{fontSize: 25}}>Основные характеристики</h4>
                    <div className={"mt-4"}>
                        {product.info.map((info, index) => (
                            <div key={info.id}
                                 className="p-2"
                                 style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent' }}>
                                {info.title}: <strong>{info.description}</strong>
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Правая колонка с ценой */}
                <Col className="ms-0 mt-5 d-flex justify-content-center align-items-center">
                    <Card className="shadow-sm d-flex flex-column align-items-center justify-content-center"
                          style={{ width: 200, height: 100, borderRadius: 10, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
                        <h2 style={{ fontSize: 40, color: 'magenta', fontWeight: 'bold' }}>
                            {Math.floor(product.price)}
                            <span style={{ fontSize: 20, fontWeight: 'normal' }}>
                                .{(product.price % 1).toFixed(2).slice(2)}
                            </span>
                        </h2>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
