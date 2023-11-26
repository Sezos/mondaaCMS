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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UserScreen from "views/User";
import ProjectScreen from "views/Project";
import ProjectLocationScreen from "views/ProjectLocation";
import WorkHourScreen from "views/WorkHour";

var routes = [
    {
        path: "/",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-orange",
        component: <Index />,
        layout: "/admin",
    },
    {
        path: "/users",
        name: "Users",
        icon: "ni ni-circle-08 text-orange",
        component: <UserScreen />,
        layout: "/admin",
    },
    {
        path: "/projects",
        name: "Projects",
        icon: "ni ni-building text-orange",
        component: <ProjectScreen />,
        layout: "/admin",
    },
    {
        path: "/projectLocations",
        name: "Project Locations",
        icon: "ni ni-pin-3 text-orange",
        component: <ProjectLocationScreen />,
        layout: "/admin",
    },
    {
        path: "/workHours",
        name: "Work Hours",
        icon: "ni ni-time-alarm text-orange",
        component: <WorkHourScreen />,
        layout: "/admin",
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "ni ni-planet text-orange",
        component: <Icons />,
        layout: "/admin",
    },
    {
        path: "/",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: <Login />,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: <Register />,
        layout: "/auth",
    },
];

export default routes;
