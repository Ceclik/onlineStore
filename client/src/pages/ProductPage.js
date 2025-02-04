import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchOneProduct} from "../http/productAPI";

const ProductPage = () => {
    const [product, setProduct] = useState({info: []});
    const {id} = useParams();

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, []);

    return (
        <Container className={"mt-3"}>
            <Col md={4}>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.image}/>
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
                {product.info.map((info, index) =>
                    <Row key={info.id} className={"d-flex flex-column m-3"} style={{background: (index % 2 === 0 ? 'lightgray' : 'transparent'), padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default ProductPage;