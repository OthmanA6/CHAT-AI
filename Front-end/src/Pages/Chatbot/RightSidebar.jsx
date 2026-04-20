import React, { useState } from "react";
import { useSelector } from "react-redux";

//import images
import logo02 from "../../logo.svg";
import icons04 from "../../assets/images/icons/04.png";
import icons01 from "../../assets/images/icons/01.svg";
import icons05 from "../../assets/images/icons/05.svg";

const RightSidebar = () => {
    const { chatHistory } = useSelector((state) => state.ai);
    const [isToggleRightSidebar, setIsToggleRightSidebar] = useState(true);

    const toggleRightSidebar = () => {
        setIsToggleRightSidebar(!isToggleRightSidebar);
    }

    // Filter only user messages to show in history as "topics"
    const historyItems = chatHistory.filter(chat => chat.role === "user");

    return (
        <>
            <div className={`right-side-bar-new-chat-option ${isToggleRightSidebar ? "" : "close-right"}`}>
                <div className="new-chat-option">
                    <img src={logo02} alt="logo" style={{ maxWidth: '40px' }} />
                    <img src={icons04} alt="icons" />
                </div>
                <div className="chat-history-wrapper">
                    <div className="chat-history-area-start">
                        <h6 className="title">Chat History</h6>
                        {historyItems.length === 0 ? (
                            <div className="no-history-message text-center mt--20">
                                <p>No chat history available.</p>
                            </div>
                        ) : (
                            historyItems.map((item, index) => (
                                <div key={index} className="single-history">
                                    <p>{item.content.length > 25 ? item.content.substring(0, 25) + "..." : item.content}</p>
                                    <img src={icons05} alt="icons" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div
                    onClick={toggleRightSidebar}
                    className="right-side-open-clouse" id="collups-right">
                    <img src={icons01} alt="icons" />
                </div>
            </div>
        </>
    );
};

export default RightSidebar;