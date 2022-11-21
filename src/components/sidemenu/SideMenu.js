import React from 'react';
import { Form, Nav } from 'react-bootstrap';
import { AiTwotoneHome, AiOutlineLogout } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';
import { FaHashtag, FaRegBookmark, FaRegEnvelope } from 'react-icons/fa';
import { RiFileList2Line, RiNotification2Line } from 'react-icons/ri';
import { HiOutlineUser } from 'react-icons/hi';
import './SideMenu.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slice/theme';

const SideMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentThemeMode = useSelector(state => state.themeReducer);
    const userId = localStorage.getItem("userId");

    const handleClick = (route, item) => {
        navigate(route, {
            state: {
                item
            }
        });
    }
    const handleTheme = (val) => {
        console.log(val)
        dispatch(setTheme(val));
    }

    const handleChange = (key) => {
        switch (key) {
            case "6":
                handleClick(`/profile/${userId}`);
                break;
            case "7":
                localStorage.clear();
                handleClick("/");
                break;
            default:
                return

        }
    }
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidemenu" onSelect={handleChange}>
            <Nav.Link href="/home"><AiTwotoneHome /> &nbsp; Home</Nav.Link>
            <Nav.Link eventKey="1"><FaHashtag /> &nbsp; Explore</Nav.Link>
            <Nav.Link eventKey="2"><RiNotification2Line /> &nbsp; Notification</Nav.Link>
            <Nav.Link eventKey="3"><FaRegEnvelope /> &nbsp; Messages</Nav.Link>
            <Nav.Link eventKey="4"><FaRegBookmark /> &nbsp; Bookmarks</Nav.Link>
            <Nav.Link eventKey="5"><RiFileList2Line /> &nbsp; Lists</Nav.Link>
            <Nav.Link eventKey="6"><HiOutlineUser /> &nbsp; Profile</Nav.Link>
            <Nav.Link eventKey="7"><AiOutlineLogout /> &nbsp; Logout</Nav.Link>
            <Nav.Link eventKey="8"><CgMoreO /> &nbsp; More</Nav.Link>
            <div className='theme-switch'>
                <Form.Check
                    checked={currentThemeMode?.isNightMode}
                    type="switch"
                    onChange={(e) => handleTheme(e.target.checked)}
                    label="Day / Night" />
            </div>
        </Nav>
    )
}

export default SideMenu;