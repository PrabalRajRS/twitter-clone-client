import React, { useEffect, useRef, useState } from "react";
import { Image, Nav } from "react-bootstrap";
import CustomWideButton from "../customWideButton/CustomWideButton";
import { AiOutlineSchedule } from "react-icons/ai"
import "./ProfilePageHeader.scss";
import { GetApi, PostApi, PutApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import { useSelector } from "react-redux";

const ProfilePageHeader = ({ userId }) => {

    const [userData, setUserData] = useState();
    const [followButtonText, setFollowButtonText] = useState("Follow")
    const profilePicRef = useRef(null);
    const coverPicRef = useRef(null);
    const [response, setResponse] = useState();
    const [pictures, setPictures] = useState({
        profile: "",
        cover: ""
    })

    const loggedUserId = localStorage.getItem("userId");

    const handlePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log("profilePicRef", pictures.cover)
        if (pictures?.profile) {
            formData.append('profilePicture', pictures?.profile);
            console.log("formData", formData)
            await PutApi(`${baseUrl}/users/profilePicture/${loggedUserId}`, formData)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        } else if (pictures?.cover) {
            formData.append('coverPhoto', pictures?.cover);
            await PutApi(`${baseUrl}/users/coverPhoto/${loggedUserId}`, formData)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    }

    const getUserData = async () => {
        await GetApi(`${baseUrl}/users/${userId}`)
            .then(response => {
                setUserData(response?.user);
                const followData = response?.user?.followers.includes(loggedUserId)
                setFollowButtonText(followData ? "Unfollow" : "Follow")
            })
            .catch(error => console.log(error))
    }
    console.log("userData", userData)

    useEffect(() => {
        const followData = userData?.followers.includes(loggedUserId)
        setFollowButtonText(followData ? "Unfollow" : "Follow")
        console.log("followData", followData)
    }, [response])

    const changeProfilePicture = () => {
        console.log("pro")
        profilePicRef.current.click()
    };

    const changeCoverPicture = () => {
        console.log("cov")
        coverPicRef.current.click()
    };

    const handleFollow = async (item) => {
        await PostApi(`${baseUrl}/users/follow/${item}/${loggedUserId}`)
            .then(response => {
                setResponse(response);
            })
            .catch(error => console.log(error))

        await PostApi(`${baseUrl}/users/following/${loggedUserId}/${item}`)
            .then(response => {
                setResponse(response);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUserData();
    }, [response]);

    return (
        <div className="container">
            <form encType="multipart/form-data" onSubmit={handlePost}>
                <div className="cover-pic" onClick={loggedUserId === userId && changeCoverPicture}>
                    <input ref={coverPicRef}
                        onChange={e => setPictures({ cover: e.target.files[0] })}
                        className="d-none"
                        name="coverPhoto"
                        type="file" />
                    <Image className="image" src={`http://localhost:3000/uploads/${userData?.coverPhoto}`} />
                </div>
                <div className="profile-pic" onClick={loggedUserId === userId && changeProfilePicture}>
                    <input ref={profilePicRef}
                        onChange={e => setPictures({ profile: e.target.files[0] })}
                        name="profilePicture"
                        className={`d-none`}
                        type="file" />
                    {
                        userData?.profilePicture
                            ? <Image className="image" src={`http://localhost:3000/uploads/${userData?.profilePicture}`} />
                            : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                    }
                </div>
                {
                    loggedUserId === userId
                        ? <div className="edit-profile-button" >
                            <CustomWideButton className="small-white" type="submit" buttonText="Edit Profile" />
                        </div>
                        : <div className="edit-profile-button" onClick={() => handleFollow(userData?._id)}>
                            <CustomWideButton className="small-white" buttonText={followButtonText} />
                        </div>
                }
            </form>
            <div className="profile-details">
                <h5 className="profile-name">{userData?.name}</h5>
                <p className="user-name">@{userData?.name}</p>
                <p className="date"><AiOutlineSchedule /> Joined {userData?.createdAt || "11-01-2022"}</p>
                <div style={{ display: "flex" }}>
                    <p className="user-name">{userData?.following.length} Following</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <p className="user-name">{userData?.followers.length} Followers</p>
                </div>
            </div>
            <Nav justify variant="pills" defaultActiveKey="/home" className="nav-bar">
                <Nav.Item>
                    <Nav.Link href="/home" eventKey="1">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2">Tweets & Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="4" >
                        Likes
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div >
    )
}

export default ProfilePageHeader;