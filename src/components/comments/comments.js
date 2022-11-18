import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetApi, PostApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import "./comments.scss";

const Comments = ({ item }) => {
    const navigate = useNavigate();
    const loggedUserId = localStorage.getItem("userId");
    const [users, setUsers] = useState();
    const [loggedUser, setLoggedUser] = useState({})
    const [comments, setComments] = useState();
    const [response, setResponse] = useState()
    const [commentData, setCommentData] = useState({
        userId: "",
        postId: "",
        text: ""
    })

    const handleClick = (route, item) => {
        navigate(route, {
            state: {
                item
            }
        });
    }
    const getComments = async () => {
        await GetApi(`${baseUrl}/comments`)
            .then(response => {
                const filteredComments = response?.comments && response?.comments.filter(comment => comment?.postId === item?._id)
                setComments(filteredComments);
            })
            .catch(error => console.log(error))
    }
    const getUserData = async () => {
        await GetApi(`${baseUrl}/users`)
            .then(response => {
                setUsers(response?.data?.users);
            })
            .catch(error => console.log(error))
        await GetApi(`${baseUrl}/users/${loggedUserId}`)
            .then(response => {
                setLoggedUser(response.user);
            })
            .catch(error => console.log(error))
    }

    const handleProfileData = (data) => {
        return users && users.find(user => user._id === data?.userId)
    }

    useEffect(() => {
        getUserData()
        getComments()
    }, [response]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData({
            ...commentData,
            [name]: value
        })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        const comment = {
            userId: loggedUserId,
            postId: item?._id,
            text: commentData?.text
        }
        await PostApi(`${baseUrl}/comments`, comment)
            .then(response => {
                setResponse(response.data)
            })
            .catch(error => console.log(error))
        setCommentData({ text: "" })
    }

    return (
        <div className="comments-container">
            <Row>
                <Col sm={1}>
                    <div className="image-container">
                        {handleProfileData(item)?.profilePicture != ""
                            ? <Image className="image" src={`http://localhost:3000/uploads/${handleProfileData(item)?.profilePicture}`} />
                            : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />}
                    </div>
                </Col>
                <Col sm={11}>
                    <p className="profileName" style={{ marginLeft: "20px" }} >
                        {handleProfileData(item)?.name}<br /><i> @{handleProfileData(item)?.name}</i>
                    </p>
                    <div style={{ margin: "20px" }} >
                        <p className="content">{item?.content}</p>
                        <div className="img-container">
                            {
                                item?.image != ""
                                && item?.image.map((img, idx) => <Image key={idx} src={`http://localhost:3000/uploads/${img}`} className="img" />)
                            }
                        </div>
                    </div>
                    <div className="post-area">
                        <Row>
                            <Col sm={1}>
                                <div className="image-container">
                                    {console.log("addaaa", handleProfileData(item))}
                                    {handleProfileData(item)?.profilePicture != ""
                                        ? <Image className="image" src={`http://localhost:3000/uploads/${loggedUser?.profilePicture}`} />
                                        : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />}
                                </div>
                            </Col>
                            <Col sm={10}>
                                <form onSubmit={handlePost} encType="multipart/form-data">
                                    <FormControl onChange={(handleChange)} name="text" className='input' value={commentData.text} placeholder="What's Happening?" />
                                    <div className="post-area-footer">
                                        <Button className="tweet-button" type="submit">Reply</Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>


                    </div>
                    <div className="comment-section">
                        {
                            comments && comments.map((comment) => (
                                <div key={comment?._id}>
                                    <Row className="comment">
                                        <Col sm={1}>
                                            <div className="image-container">
                                                {handleProfileData(comment)?.profilePicture != ""
                                                    ? <Image className="image" src={`http://localhost:3000/uploads/${handleProfileData(comment)?.profilePicture}`} />
                                                    : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />}
                                            </div>
                                        </Col>
                                        <Col sm={11}>
                                            <div style={{ padding: "5px 20px" }}>
                                                <p className="profileName" onClick={() => handleClick(`/profile/${handleProfileData(comment)?._id}`, comment)}>
                                                    {handleProfileData(comment)?.name}<i> @{handleProfileData(comment)?.name}</i>
                                                </p>
                                                <p className="replyTo">Replying to <i>@{handleProfileData(item)?.name}</i></p>
                                                <p>{comment?.text}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Comments;