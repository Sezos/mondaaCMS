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

  logout = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

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
          new Date(Date.now() + data.expires_in),
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
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };

  getUserInfo = async (id) => {
    try {
      const { data } = await this.backend.get(instances.getUserInfo + "/" + id);
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };

  updateUser = async (id, body) => {
    try {
      const { data } = await this.backend.patch(
        instances.updateEmployeeInfo + "/" + id,
        body,
      );
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };

  getProjects = async (date) => {
    try {
      const { data } = await this.backend.post(instances.getProjectByDate, {
        date,
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };
  getProjectLocations = async () => {
    try {
      const { data } = await this.backend.get(instances.getAllProjectLocation);
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };

  getWorkHoursTotal = async (from, to, employeeId, projectLocationId) => {
    try {
      console.log(from, to, employeeId, projectLocationId);
      let query = "?";
      if (from) {
        query += query === "?" ? "" : "&";
        query += `from=${from}`;
      }
      if (to) {
        query += query === "?" ? "" : "&";
        query += `to=${to}`;
      }
      if (employeeId) {
        query += query === "?" ? "" : "&";
        query += `employeeId=${employeeId}`;
      }
      if (projectLocationId) {
        query += query === "?" ? "" : "&";
        query += `projectLocationId=${projectLocationId}`;
      }

      const { data } = await this.backend.get(
        instances.getWorkHoursTotal + query,
      );
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };

  getWorkHours = async (fromDate, toDate, employeeId, projectLocationId) => {
    try {
      const { data } = await this.backend.post(instances.getWorkHours, {
        query: {
          Project: {
            date: {
              gte: `${fromDate}T00:00:00Z`,
              lte: `${toDate}T23:59:59Z`,
            },
            ...(projectLocationId
              ? {
                  ProjectLocation: {
                    id: projectLocationId,
                  },
                }
              : {}),
          },
          ...(employeeId
            ? {
                User: {
                  id: employeeId,
                },
              }
            : {}),
        },
        selection: {
          id: true,
          hours: true,
          rate: true,
          User: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              rate: true,
              isGST: true,
              employeeId: true,
            },
          },
          Project: {
            select: {
              date: true,
              ProjectLocation: {
                select: {
                  name: true,
                  id: true,
                  location: true,
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };
  getFiles = async (id) => {
    try {
      const { data } = await this.backend.get(instances.files + "/" + id);
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };
  getFile = async (id) => {
    try {
      const { data } = await this.backend.get(instances.files + "/file/" + id);
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };
  checkFile = async (id) => {
    try {
      const { data } = await this.backend.patch(instances.files + "/" + id);
      return data;
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) this.logout();
      console.log(error);
    }
  };
}

const services = new Services();

export default services;
