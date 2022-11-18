import React, { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import './Landing.scss';
import Button from 'react-bootstrap/Button';
import Login from "../../components/login/Login";
import CustomWideButton from "../../components/customWideButton/CustomWideButton";
import Register from "../../components/register/Register";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    const [loginModalShow, setLoginModalShow] = React.useState(false);
    const [registerModalShow, setRegisterModalShow] = React.useState(false);

    const loggedUserId = localStorage.getItem("userId");

    const handleShowModal = (val) => {
        if (val === "register") {
            setRegisterModalShow(true);
            setLoginModalShow(false)
        } else {
            setLoginModalShow(true)
            setRegisterModalShow(false);
        }
    }

    useEffect(() => {
        if (loggedUserId) {
            navigate("/home")
        }
    }, [])

    return (
        <Container className="landing">
            <Row>
                <Col className="left-side" sm={6} xs={12}>
                    <Image src="/landing.jpg" className="landing-image" />
                </Col>
                <Col className="right-side" sm={6} xs={12}>
                    <Image src="/twitter-logo.png" className="twitter-logo" />
                    <h1 className="titleOne">Happening now</h1>
                    <h3 className="titleTwo">Join Twitter Today.</h3>
                    <CustomWideButton onClick={() => handleShowModal('register')} className="signUp-button" buttonText="Sign up with phone or email" />
                    <p className="termConditions">
                        By signing up, you agree to the <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
                    </p>
                    <p className="already-have-account">Already have an account?</p>
                    <CustomWideButton onClick={() => handleShowModal('signin')} className="signIn-button" buttonText="Sign in" />
                </Col>
            </Row>
            
            <Modal
                show={loginModalShow || registerModalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {
                    loginModalShow
                        ? <Login onHide={() => setLoginModalShow(false)} handleShowModal={handleShowModal} />
                        : <Register onHide={() => setRegisterModalShow(false)} handleShowModal={handleShowModal} />
                }

            </Modal>

        </Container>
    )
}

export default Landing