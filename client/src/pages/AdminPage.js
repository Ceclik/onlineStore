import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateProducer from "../components/modals/CreateProducer";
import CreateProduct from "../components/modals/CreateProduct";
import DeleteProducer from "../components/modals/DeleteProducer";
import DeleteType from "../components/modals/DeleteType";
import DeleteProduct from "../components/modals/DeleteProduct";
import EditProduct from "../components/modals/EditProduct";

const AdminPage = () => {
    const [producerVisible, setProducerVisible] = useState(false);
    const [deleteProducerVisible, setDeleteProducerVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [typeDeleteVisible, setTypeDeleteVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [productDeleteVisible, setProductDeleteVisible] = useState(false);
    const [productEditVisible, setProductEditVisible] = useState(false);
    return (
        <Container className={'d-flex flex-column'}>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setProducerVisible(true)}>Добавить
                производителя</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setDeleteProducerVisible(true)}>Удалить
                производителя</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setTypeVisible(true)}>Добавить
                тип</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setTypeDeleteVisible(true)}>Удалить
                тип</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setProductVisible(true)}>Добавить
                товар</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setProductDeleteVisible(true)}>Удалить
                товар</Button>
            <Button variant={'outline-dark'} className={'mt-4 p-2'} onClick={() => setProductEditVisible(true)}>Редактировать
                товар</Button>

            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)}/>
            <CreateProducer show={producerVisible} onHide={() => setProducerVisible(false)}/>
            <DeleteProducer show={deleteProducerVisible} onHide={() => setDeleteProducerVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <DeleteProduct show={productDeleteVisible} onHide={() => setProductDeleteVisible(false)}/>
            <EditProduct show={productEditVisible} onHide={() => setProductEditVisible(false)}/>
        </Container>
    );
};

export default AdminPage;