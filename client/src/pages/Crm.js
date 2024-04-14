import React from "react";
import { Container, Col } from "react-bootstrap";
import ClientTable from "../components/ClientTable";

const Crm = () => {
    return (
        <Container>
            <Col className="mt-3">
                <ClientTable />

            </Col>


        </Container>
    );
};


export default Crm;