import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ProducerBar from "../components/ProducerBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducers, fetchProducts, fetchTypes} from "../http/deviceAPI";

const ShopPage = observer(() => {
    const {product} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducers().then(data => product.setProducers(data));
        fetchProducts().then(data => product.setProducts(data.rows));
    }, []);

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <ProducerBar />
                    <ProductList />
                </Col>
            </Row>
        </Container>
    );
});

export default ShopPage;