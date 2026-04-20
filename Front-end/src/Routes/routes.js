import React from "react";
import Dashboard from "Pages/Home/index";
import Chatbot from "Pages/Chatbot";
import ImageGenerator from "Pages/ImageGenerator";
import Login from "Pages/Auth/Login";
import ResetPassword from "Pages/Auth/ResetPassword";

const routes = [
    { path: "/", component: <Dashboard /> },
    { path: "/chatbot", component: <Chatbot /> },
    { path: "/image-generator", component: <ImageGenerator /> },
];

const nonAuthRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/reset-password", component: <ResetPassword /> },
]

export {
    routes,
    nonAuthRoutes
};
