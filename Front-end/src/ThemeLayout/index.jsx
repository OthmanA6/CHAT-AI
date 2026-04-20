import React from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";

const ThemeLayout = ({ children }) => {
    return (
        <>
            <TopBar />
            <div className="dash-board-main-wrapper">
                <LeftSidebar />
                {children}
            </div>
        </>
    );
};

export default ThemeLayout;