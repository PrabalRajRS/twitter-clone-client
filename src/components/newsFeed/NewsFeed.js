import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton, Image, Modal, Row } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRetweet } from 'react-icons/fa';
import { BsChat } from 'react-icons/bs';
import { BiUpload } from 'react-icons/bi'

import "./NewsFeed.scss";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteApi, GetApi, PostApi, PutApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import { useSelector } from "react-redux";
import { RiCreativeCommonsZeroLine } from "react-icons/ri";
import Comments from "../comments/comments";

const NewsFeed = () => {
    const navigate = useNavigate();
    const loggedUserId = localStorage.getItem("userId");
    const [currentItem, setCurrentItem] = useState()
    const [newsFeed, setNewsFeed] = useState();
    const [users, setUsers] = useState();
    const params = useParams();
    const [response, setResponse] = useState()
    const [comments, setComments] = useState()
    const [showPost, setShowPost] = useState(false);

    const handleClose = () => {
        setShowPost(false)
        setResponse({})
    };

    const getComments = async (item) => {
        await GetApi(`${baseUrl}/comments`)
            .then(response => {
                setComments(response?.comments);
            })
            .catch(error => console.log(error))
    }

    const filterComments = (item) => {
        const filteredComments = comments
            && comments.filter(comment => comment?.postId === item?._id)
        return filteredComments
    }

    const getUserData = async () => {
        await GetApi(`${baseUrl}/users`)
            .then(response => {
                setUsers(response?.data?.users);
            })
            .catch(error => console.log(error))
    }

    const handleClick = (route, item) => {
        navigate(route, {
            state: {
                item
            }
        });
    }

    const getNewsFeed = async () => {
        await GetApi(`${baseUrl}/newsFeed`)
            .then(response => {
                if (params?.id) {
                    const filteredFeeds = response?.newsFeed.filter(news => news?.userId === params?.id)
                    setNewsFeed(filteredFeeds);
                } else {
                    setNewsFeed(response?.newsFeed);
                }
            })
            .catch(error => console.log(error))
    }

    const handleProfileData = (item) => {
        return users && users.find(user => user._id === item?.userId)
    }
    const handleLike = async (item) => {
        await PostApi(`${baseUrl}/newsFeed/likepost/${item}/${loggedUserId}`)
            .then(response => {
                setResponse(response);
            })
            .catch(error => console.log(error))
    }

    const handleRetweet = async (item) => {
        const formData = new FormData();
        formData.append("userId", loggedUserId)
        formData.append("image", item?.image)
        formData.append("content", item?.content)
        formData.append("reTweets", item?.reTweets)
        formData.append("name", handleProfileData(item)?.name)
        formData.append("likes", item?.likes)
        // for (let i = 0; i < item.image.length; i++) {
        //     formData.append("image[]", item.image[i]);
        // }
        formData.append("image[]", item?.image)

        await PostApi(`${baseUrl}/newsFeed/retweet/${item._id}/${loggedUserId}`)
            .then(response => {
                setResponse(response);
            })
            .catch(error => console.log(error))

        await PostApi(`${baseUrl}/newsFeed`, formData)
            .then(response => {
                setResponse(response.data)
            })
            .catch(error => console.log(error))
    }

    const handleshowPost = (item) => {
        setCurrentItem(item)
        setShowPost(true)
    }

    const handleDelete = async (id) => {
        await DeleteApi(`${baseUrl}/newsFeed/${id}`)
            .then(response => {
                setResponse(response)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getNewsFeed();
        getUserData();
        getComments();
    }, [response]);

    return (
        <div className="newsfeed">
            {
                newsFeed && newsFeed.map((item) => (
                    <div className="container" key={item?._id}>
                        {
                            item?.name &&
                            <p style={{ fontWeight: "500", marginBottom: 0, marginLeft: "80px", color: "grey" }}>
                                {(item?.userId === loggedUserId ? `You Retweeted` : `${item?.name} Retweeted`)}
                            </p>
                        }
                        <Row >
                            <Col sm={2} className="left-side">
                                <div className="image-container">
                                    {handleProfileData(item)?.profilePicture != ""
                                        ? <Image className="image" src={`http://localhost:3000/uploads/${handleProfileData(item)?.profilePicture}`} />
                                        : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />}
                                </div>
                            </Col>
                            <Col sm={10} className="right-side">
                                <div className="card" key={item._id}>
                                    {
                                        item._id === loggedUserId &&
                                        <DropdownButton size="sm" className="delete">
                                            <Dropdown.Item onClick={() => handleDelete(item._id)}>Delete</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                    }
                                    {
                                        item?.name
                                            ? <p className="profileName">
                                                {item?.name}<i> @{item?.name}</i>
                                            </p> :
                                            <p className="profileName" onClick={() => handleClick(`/profile/${handleProfileData(item)?._id}`, item)}>
                                                {handleProfileData(item)?.name}<i> @{handleProfileData(item)?.name}</i>
                                            </p>
                                    }
                                    <div onClick={() => handleshowPost(item)}>
                                        <p >{item?.content}</p>
                                        <div className="img-container">
                                            {
                                                item?.image != ""
                                                && item?.image.map((img, idx) => <Image key={idx} src={`http://localhost:3000/uploads/${img}`} className="img" />)
                                            }
                                        </div>
                                    </div>
                                    <div className="icons">
                                        <span><BsChat className="icon" />{filterComments(item)?.length}</span>
                                        <span>
                                            {
                                                <FaRetweet className="icon" onClick={() => handleRetweet(item)} />
                                            }
                                            {item?.reTweets?.length}
                                        </span>
                                        <span>
                                            {
                                                item?.likes.includes(loggedUserId)
                                                    ? <AiFillHeart className="icon" style={{ color: "pink" }} onClick={() => handleLike(item._id)} />
                                                    : <AiOutlineHeart className="icon" onClick={() => handleLike(item._id)} />
                                            }
                                            {item?.likes?.length}</span>
                                        <span><BiUpload className="icon" /></span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
            <Modal
                size="lg"
                show={showPost}
                onHide={handleClose}
            >
                <Comments item={currentItem} />
            </Modal>
        </div>
    )
}

export default NewsFeed;