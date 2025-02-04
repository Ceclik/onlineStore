import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ProducerBar from "../components/ProducerBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducers, fetchProducts, fetchTypes} from "../http/productAPI";
import PagesBar from "../components/PagesBar";

const ShopPage = observer(() => {
    const {product} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data));
        fetchProducers().then(data => product.setProducers(data));
        fetchProducts(null, null, 1, 3).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count)
        });
    }, []);

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedProducer.id, product.page, 2).then(data => {
            product.setProducts(data.rows);
            product.setTotalCount(data.count);
        })
    }, [product.page, product.selectedType, product.selectedProducer, ]);

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <ProducerBar />
                    <ProductList />
                    <PagesBar />
                </Col>
            </Row>
        </Container>
    );
});

export default ShopPage;