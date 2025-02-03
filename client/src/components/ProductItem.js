import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    console.log(navigate);
    return (
        <Col md = {3} className={"mt-3"} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src = {product.img}/>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <div>{product.name}</div>
                </div>
                <div className={"text-black-50"}>Веник гуд компани</div>
            </Card>
        </Col>
    );
};

export default ProductItem;