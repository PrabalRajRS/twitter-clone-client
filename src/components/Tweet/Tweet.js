import React, { useEffect, useState } from "react";
import { Button, Col, FormControl, Image, Row } from "react-bootstrap";
import { AiOutlineFileGif, AiOutlineSchedule } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { BsEmojiSmile, BsImage, BsListStars } from 'react-icons/bs';
import { FaGlobeAsia } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { PostApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import './Tweet.scss';

const Tweet = () => {
    const userId = localStorage.getItem("userId");
    const currentUser = useSelector(state => state.authReducer?.user);
    const items = [
        {
            id: 0,
            icon: <BsImage />,
        },
        {
            id: 1,
            icon: <AiOutlineFileGif />,
        },
        {
            id: 2,
            icon: <BsListStars />,
        },
        {
            id: 3,
            icon: <BsEmojiSmile />,
        },
        {
            id: 4,
            icon: <AiOutlineSchedule />,
        },
        {
            id: 5,
            icon: <BiMap />,
        }
    ];
    const [data, setData] = useState({
        userId,
        content: "",
        likes: [],
        reTweets: [],
        comments: [],
        image: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handlePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', data.userId);
        formData.append('content', data.content);
        // formData.append('likes', data.likes);
        // formData.append('reTweets', data.reTweets);
        // formData.append('comments', data.comments);

        for (let i = 0; i < data.image?.files.length; i++) {
            formData.append("image[]", data.image?.files[i]);

        }
        await PostApi(`${baseUrl}/newsFeed`, formData)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setData({ ...data, image: document.getElementById("input-file") });
    }, []);

    const handleUpload = () => {
        data?.image?.click();
    };

    const handleClick = (item) => {
        switch (item.id) {
            case 0:
                handleUpload()
                break;
            case 1:
                handleUpload();
                break;
            default:
                return
        }
    }

    return (
        <Row className="container">
            <Col sm={2} className="left-side">
                <div className="image-container">
                    {
                        currentUser?.profilePicture != ""
                            ? <Image className="image" src={`http://localhost:3000/uploads/${currentUser?.profilePicture}`} />
                            : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />}
                </div>
            </Col>
            <Col sm={10} className="post-area">
                <form onSubmit={handlePost} encType="multipart/form-data">
                    <FormControl onChange={handleChange} name="content" className='input' placeholder="What's Happening?" />
                    <div className="post-area-footer">
                        <Button className="status-button"><FaGlobeAsia /> Everyone can Reply</Button>
                        <div className="icons">
                            {
                                items.map((item) => (
                                    <div className="icon" onClick={() => handleClick(item)} key={item.id}>
                                        <input id="input-file" className="d-none" type="file" multiple />
                                        {item.icon}
                                    </div>
                                ))
                            }
                        </div>
                        <Button className="tweet-button" type="submit">Tweet</Button>
                    </div>
                </form>
            </Col>
        </Row>
    )

}

export default Tweet;