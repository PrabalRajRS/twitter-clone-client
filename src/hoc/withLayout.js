import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import SideMenu from "../components/sidemenu/SideMenu";
// import './Home.scss';

const withLayout = (PageComponent) => {
    return (
        <Container className="home-container">
            <Row >
                <Col sm={3} xs={12} className="col-1">
                    <Row className="col-header">
                        <div>
                            <Image src="/twitter-logo.png" className="logo" />
                        </div>
                    </Row>
                    <div className="col-body sidebar fixed-top">
                        <SideMenu />
                        <Button className="tweet-button">Tweet</Button>
                    </div>

                </Col>
                <div>
                    <PageComponent />
                </div>
            </Row>
        </Container>
    )
}

export default withLayout;