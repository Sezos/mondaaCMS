/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import {
    HashRouter,
    Route,
    Routes,
    Navigate,
    BrowserRouter,
} from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
};

const user = localStorage.getItem("access_token");
const expiry = localStorage.getItem("expires_in");

const check = () => {
    if (!user || !expiry) return false;
    if (expiry < new Date()) return false;
    return true;
};

root.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
            <Routes>
                {check() ? (
                    <Route path="/*" element={<AdminLayout />} />
                ) : (
                    <Route path="/*" element={<AuthLayout />} />
                )}
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Routes>
        </BrowserRouter>
    </AlertProvider>
);
