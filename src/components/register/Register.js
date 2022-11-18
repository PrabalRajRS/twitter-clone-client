import React, { useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import CustomWideButton from "../customWideButton/CustomWideButton";
import { useSelector, useDispatch } from 'react-redux'
import './Register.scss';
import { PostApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";

const Register = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleButtonClick = () => {
        if (!isNextClicked) {
            setIsNextClicked(true)
        } else {
            handleRegister();
        }
    }

    const handleRegister = async () => {
        await PostApi(`${baseUrl}/users/register`, user)
            .then(response => {
                console.log(response);
                navigate("/home");
            })
            .catch(error => console.log(error))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div className="register">
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="header">
                        <CloseButton style={{ fontSize: 16 }} onClick={props.onHide} />
                        <Image src="/twitter-logo.png" className="twitter-logo" />
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body">
                    <h3 className="body-title">Sign Up to Twitter</h3>
                    <br />
                    <Form.Control
                        style={{ width: "300px" }}
                        onChange={handleChange}
                        name="name"
                        value={user.name}
                        type="text"
                        placeholder="Name"
                    />
                    <br />
                    <Form.Control
                        style={{ width: "300px" }}
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        type="text"
                        placeholder="Phone, email, or username"
                    />
                    <br />
                    {isNextClicked &&
                        <div>
                            <Form.Control
                                style={{ width: "300px" }}
                                onChange={handleChange}
                                name="password"
                                value={user.password}
                                type="password"
                                placeholder="Password"
                            />
                            <br />
                        </div>}
                    <CustomWideButton
                        className="next-button"
                        buttonText={isNextClicked ? "Signup" : "Next"}
                        onClick={handleButtonClick} />
                    <p onClick={() => props.handleShowModal('signin')} className="dont-have-account">
                        Already have an account? <b>SignIn</b>
                    </p>
                </div>
            </Modal.Body>
        </div>
    )
}

export default Register;