import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

const ProductItem = ({product}) => {
    return (
        <Col md = {3}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src = {product.img}/>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <div>Веник</div>
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;