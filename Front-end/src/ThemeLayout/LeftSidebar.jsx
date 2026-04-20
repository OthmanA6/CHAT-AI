import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";

//import images
import icons01 from "../assets/images/icons/01.png";
import icons04 from "../assets/images/icons/04.png";
import icons05 from "../assets/images/icons/05.png";
import icons08 from "../assets/images/icons/08.png";
import icons09 from "../assets/images/icons/09.png";
import avatar02 from "../assets/images/icons/03.png";

const LeftSidebar = () => {
    const location = useLocation();
    const themeSidebarToggle = useSelector((state) => state.theme.themeSidebarToggle);
    const [open, setOpen] = useState(false);

    const handleSettingsClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className={`left-side-bar ${themeSidebarToggle ? "collapsed" : ""}`}>
                <div className="overlay-mobile-area"></div>
                <div className="inner">
                    <div className="single-menu-wrapper">
                        <Link to="/" className={`single-menu openuptip ${location.pathname === "/" ? "active" : ""
                            }`}>
                            <div className="icon">
                                <img src={icons01} alt="icons" />
                            </div>
                            <p>Home</p>
                        </Link>
                    </div>
                    <div className="single-menu-wrapper">
                        <Link to="/chatbot" className={`single-menu openuptip ${location.pathname === "/chatbot" ? "active" : ""
                            }`}>
                            <div className="icon">
                                <img src={icons04} alt="icons" />
                            </div>
                            <p>AI Chat Bot</p>
                        </Link>
                        <Link to="/image-generator" className={`single-menu openuptip ${location.pathname === "/image-generator" ? "active" : ""
                            }`}>
                            <div className="icon">
                                <img src={icons05} alt="icons" />
                            </div>
                            <p>Image Generator</p>
                        </Link>
                    </div>
                    <div className="single-menu-wrapper">
                        <Link
                            onClick={handleSettingsClick}
                            aria-expanded={open}
                            className="collapse-btn collapsed single-menu" to="#" role="button">
                            <div className="icon">
                                <img src={icons08} alt="icons" />
                            </div>
                            <p>Settings</p>
                        </Link>
                        <Collapse in={open}>
                            <ul className="submenu rts-default-sidebar-list">
                                <li>
                                    <Link to="/reset-password" className={`${location.pathname === "/reset-password" ? "active" : ""}`}>
                                        <i className="fa-sharp fa-regular fa-users"></i>
                                        <span>Reset Password</span>
                                    </Link>
                                </li>
                            </ul>
                        </Collapse>
                        <Link to="/login" className="single-menu">
                            <div className="icon">
                                <img src={icons09} alt="icons" />
                            </div>
                            <p>Logout</p>
                        </Link>
                    </div>
                </div>
                <div className="bottom-user">
                    <div className="user-wrapper">
                        <img src={avatar02} alt="avatar" />
                        <div className="info">
                            <h6 className="title">Othman</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftSidebar;