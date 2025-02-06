import React, { useState, useEffect } from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { PRODUCT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchOneProducer } from "../http/productAPI"; // Импорт запроса

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const [producerName, setProducerName] = useState("Загрузка...");

    useEffect(() => {
        fetchOneProducer(product.producerId)
            .then(data => setProducerName(data.name))
            .catch(() => setProducerName("Неизвестный производитель"));
    }, [product.producerId]);

    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.image} />
                <div className={"d-flex justify-content-between align-items-center"}>
                    <div>{product.name}</div>
                </div>
                <div className={"text-black-50"}>{producerName}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;
