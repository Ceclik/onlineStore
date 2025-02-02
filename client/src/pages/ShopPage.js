import React from 'react';
import {Outlet} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ProducerBar from "../components/ProducerBar";
import ProductList from "../components/ProductList";

const ShopPage = () => {
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
};

export default ShopPage;