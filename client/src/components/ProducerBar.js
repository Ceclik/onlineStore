import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const ProducerBar = observer(() => {
    const {product} = useContext(Context);
    return (
        <Col className="d-flex">
            {product.producers.map(producer =>
                <Card
                    style={{cursor: "pointer"}}
                    key={producer.id}
                    className="p-3"
                    onClick={() => product.setSelectedProducer(producer)}
                    border={producer.id === product.selectedProducer.id ? 'danger' : 'light'}
                >
                    {producer.name}
                </Card>
            )}
        </Col>
    );
});

export default ProducerBar;