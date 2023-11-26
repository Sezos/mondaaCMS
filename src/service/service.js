import axios from "axios";
import { instances } from "./services.path.js";

class Services {
    constructor() {
        const access_token = localStorage.getItem("access_token");
        this.backend = axios.create({
            baseURL: "https://api.mondaa.com.au/",
            // baseURL: "http://localhost:3030/",
            headers:
                access_token !== undefined
                    ? { Authorization: `Bearer ${access_token}` }
                    : {},
        });
    }

    login = async ({ email, password }) => {
        try {
            const { data } = await this.backend.post(instances.login, {
                email,
                password,
            });
            if (data.success === true) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem(
                    "expires_in",
                    new Date(Date.now() + data.expires_in)
                );
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    getUsers = async () => {
        try {
            const { data } = await this.backend.get(instances.getEmployees);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    getProjects = async (date) => {
        try {
            const { data } = await this.backend.post(
                instances.getProjectByDate,
                {
                    date,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    getProjectLocations = async () => {
        try {
            const { data } = await this.backend.get(
                instances.getAllProjectLocation
            );
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    getWorkHours = async (fromDate, toDate, employeeId, projectLocationId) => {
        try {
            const { data } = await this.backend.get(
                `${instances.getWorkHoursTotal}?from=${fromDate}&to=${toDate}${
                    employeeId ? "&employeeId=" + employeeId : ""
                }${
                    projectLocationId
                        ? "&projectLocationId=" + projectLocationId
                        : ""
                }`
            );
            return data;
        } catch (error) {
            console.log(error);
        }
    };
}

const services = new Services();

export default services;
