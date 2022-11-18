import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/slice/users";
import { GetApi, PostApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import CustomWideButton from "../customWideButton/CustomWideButton";
import "./WhoToFollow.scss";

const WhoToFollow = () => {
    const usersList = useSelector(state => state.usersReducer?.users);
    const dispatch = useDispatch();
    const [response, setResponse] = useState()
    const [filteredUsers, setFilteredUsers] = useState();
    const loggedUserId = localStorage.getItem("userId");

    const getUsersData = async () => {
        await GetApi(`${baseUrl}/users`)
            .then(response => {
                console.log(loggedUserId)
                dispatch(setUsers(response?.data));
                const filterUser = response?.data?.users?.filter((item) => {
                    return !item?.followers.includes(loggedUserId) && item?._id != loggedUserId
                });
                setFilteredUsers(filterUser);
                console.log("filterUser", filterUser)
            })
            .catch(error => console.log(error))
    }

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
        getUsersData()
    }, [response]);

    return (
        <div>
            {
                filteredUsers && filteredUsers.length > 0 &&
                <Card className="follow-cards">
                    <h4 className="title">Who to follow</h4>
                    {
                        filteredUsers && filteredUsers.map((item) => (
                            <div className="card" key={item._id}>
                                <div style={{ display: "inline-flex" }}>
                                    <div className="image-container">
                                        {
                                            item?.profilePicture
                                                ? <Image className="image" src={`http://localhost:3000/uploads/${item?.profilePicture}`} />
                                                : <Image className="image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                                        }
                                    </div>
                                    <div>
                                        <p className="name">{item.name}</p>
                                        <p className="username">@{item.name}</p>
                                    </div>
                                </div>
                                <CustomWideButton
                                    className="next-button small-width"
                                    onClick={() => handleFollow(item._id)}
                                    buttonText={item.isFollowing ? "Unfollow" : "Follow"} />
                            </div>
                        ))
                    }
                </Card>
            }
        </div>

    )
}

export default WhoToFollow;