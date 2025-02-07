import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, Col } from "react-bootstrap";

const TypeBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <Col className="d-flex gap-2 flex-wrap">
            {product.types.map(type =>
                <Card
                    style={{
                        cursor: "pointer",
                        width: 120,
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        border: `1px solid ${type.id === product.selectedType.id ? "#800080" : "#888"}`,
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "color 0.2s ease-in-out, border-color 0.2s ease-in-out"
                    }}
                    key={type.id}
                    className="p-2"
                    onClick={() => product.setSelectedType(type)}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#800080";
                        e.currentTarget.style.borderColor = "#800080";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = "black";
                        e.currentTarget.style.borderColor = "#888";
                    }}
                >
                    {type.name}
                </Card>
            )}
        </Col>
    );
});

export default TypeBar;
