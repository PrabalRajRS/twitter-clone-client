import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, FormControl, Navbar, ListGroupItem, ListGroup } from "react-bootstrap";
import SideMenu from "../../components/sidemenu/SideMenu";
import { FiSearch } from 'react-icons/fi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './Profile.scss';
import WhatsHappening from "../../components/Tweet/Tweet";
import WhatsHappeningCard from "../../components/whatshappeningCard/WhatsHappeningCard";
import NewsFeed from "../../components/newsFeed/NewsFeed";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfilePageHeader from "../../components/profilePageHeader/ProfilePageHeader";
import { GetApi } from "../../services/api.service";
import { baseUrl } from "../../services/apiUrl";
import { useSelector } from "react-redux";

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    console.log(location, params)
    const [filteredUsers, setFilteredUsers] = useState([]);
    const usersList = useSelector(state => state.usersReducer?.users);
    const currentThemeMode = useSelector(state => state.themeReducer);
    // const [users, setUsers] = useState([]);
    const [data, setData] = useState()

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate('/')
        } else {
            return;
        }
    }, [localStorage])

    const getUserData = async () => {
        await GetApi(`${baseUrl}/users/${params?.id}`)
            .then(response => {
                console.log(response);
                setData(response?.user);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUserData();
    }, [navigate])

    const [searchValue, setSearchValue] = useState("")
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        const filteredlist = usersList?.users.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredUsers(filteredlist)
    }

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            navigate('/')
        } else {
            return;
        }
    }, [localStorage])

    const handleNavigate = (user) => {
        navigate(`/profile/${user._id}`)
    }


    return (
        <Container className="profile-container">
            <Row >
                <Col sm={3} xs={12} className="col-1">
                    <Row className={`col-header ${currentThemeMode?.isNightMode && "dark-header-background"}`}>
                        <div>
                            <Image src="/twitter-logo.png" className="logo" />
                        </div>
                    </Row>
                    <div className="col-body sidebar fixed-top">
                        <SideMenu />
                        <Button className="tweet-button">Tweet</Button>
                    </div>

                </Col>
                <Col sm={5} xs={12} className="col-2">
                    <Row className={`col-header ${currentThemeMode?.isNightMode && "dark-header-background"}`}>
                        <Col sm={1} xs={1} style={{ border: 'none', paddingTop: 10 }}>
                            <IoMdArrowRoundBack onClick={() => navigate(-1)} />
                        </Col>
                        <Col sm={11} xs={11} style={{ paddingTop: 10 }}>
                            <h5 className="page-title">{data?.name}</h5>
                        </Col>
                    </Row>
                    <div className="col-body">
                        <ProfilePageHeader profileData={data} userId={params?.id} />
                        <NewsFeed />
                    </div>
                </Col>
                <Col sm={4} xs={12} className="col-3">
                    <Row className={`col-header ${currentThemeMode?.isNightMode && "dark-header-background"}`}>
                        <div style={{ padding: "10px 50px 10px 30px" }}>
                            <div className="search-container">
                                <FiSearch className="search-icon" />
                                <FormControl className="search-bar"
                                    type="search"
                                    onChange={handleSearch}
                                    placeholder="Search Twitter" />
                            </div>
                            {
                                searchValue != ''
                                && <ListGroup className="search-list">
                                    {filteredUsers.map(user => (
                                        <ListGroupItem key={user._id} className="search-item" onClick={() => handleNavigate(user)}>
                                            {user.name}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            }
                        </div>
                    </Row>
                    <div className="col-body">
                        <div>
                            <WhatsHappeningCard />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;