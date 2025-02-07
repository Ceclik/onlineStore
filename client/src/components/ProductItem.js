import React, { useState, useEffect } from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { PRODUCT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { fetchOneProducer } from "../http/productAPI";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const [producerName, setProducerName] = useState("Загрузка...");

    useEffect(() => {
        fetchOneProducer(product.producerId)
            .then(data => setProducerName(data.name))
            .catch(() => setProducerName("Неизвестный производитель"));
    }, [product.producerId]);

    return (
        <Col lg={3} md={4} sm={6} xs={12} className="mt-3">
            <Card
                style={{
                    width: "100%",
                    height: 250,
                    cursor: "pointer",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    transition: "box-shadow 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
                onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
            >
                <Image width={120} height={120} src={process.env.REACT_APP_API_URL + product.image} />
                <div className="mt-2 fw-bold">{product.name}</div>
                <div className="text-black-50">{producerName}</div>
            </Card>
        </Col>
    );
};

export default ProductItem;
