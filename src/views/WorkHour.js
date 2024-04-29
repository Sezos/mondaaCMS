/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";

// reactstrap components

import Header from "components/Headers/Header.js";
import services from "../service/service";
import List from "./List";
import { DatePicker } from "reactstrap-date-picker";
import { Col, Row } from "reactstrap";
import Select from "react-select";

const WorkHourScreen = (props) => {
  const fields = [
    "date",
    "project",
    "employeeId",
    "name",
    "rate",
    "hours",
    "isGST",
    "salary",
  ];

  const [datas, setDatas] = useState([]);
  //dates
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const [type, setType] = useState({ value: 1, label: "Each" });

  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [projectLocations, setProjectLocations] = useState([]);
  const [projectLocationId, setProjectLocationId] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  function handleChange(value, _type) {
    if (_type === 1) {
      setFromDate(value.split("T")[0]);
      if (new Date(value) > new Date(toDate)) {
        setToDate(value.split("T")[0]);
      }
    } else {
      setToDate(value.split("T")[0]);
      if (new Date(fromDate) > new Date(value)) {
        setFromDate(value.split("T")[0]);
      }
    }
  }

  useEffect(() => {
    fetch();
  }, [fromDate, toDate, employeeId, projectLocationId, type]);

  useEffect(() => {
    initFetch();
  }, []);

  const initFetch = async () => {
    const employs = [{ value: undefined, label: "Any" }].concat(
      (await services.getUsers())
        .map((emp) => {
          return {
            value: emp.id,
            label: emp.firstName + " " + emp.lastName,
          };
        })
        .filter((lol) => lol.value !== null),
    );

    const locations = [{ value: undefined, label: "Any" }].concat(
      (await services.getProjectLocations()).map((proj) => {
        return {
          value: proj.id,
          label: proj.name,
        };
      }),
    );

    setEmployees(employs);
    setProjectLocations(locations);
  };

  const fetch = async () => {
    let newData = [];
    if (type.value === 1) {
      const data = await services.getWorkHours(
        fromDate,
        toDate,
        employeeId?.value,
        projectLocationId?.value,
      );
      newData = data.map((dat) => {
        return {
          project: dat.Project.ProjectLocation.name,
          employeeId: dat.User.employeeId,
          name: dat.User.firstName,
          rate: dat.rate,
          date: dat.Project.date.split("T")[0],
          hours: dat.hours,
          isGST: dat.User.isGST ? "Yes" : "No",
          salary: `$${(
            dat.hours *
            dat.rate *
            (dat.User.isGST ? 1.1 : 1)
          ).toFixed(1)}`,
        };
      });
      setDatas(newData);
    } else {
      const data = await services.getWorkHoursTotal(
        fromDate,
        toDate,
        employeeId?.value,
        projectLocationId?.value,
      );
      newData = data.map((dat) => {
        return {
          employeeId: dat.User.employeeId,
          name: dat.User.firstName,
          rate: dat.rate,
          hours: dat.workHours,
          isGST: dat.User.isGST ? "Yes" : "No",
          salary: `$${dat.salary}`,
        };
      });
      setDatas(newData);
    }
    calculateTotal(newData);
  };

  const calculateTotal = (datas) => {
    const totalHrs = datas.reduce((partialSum, a) => partialSum + a.hours, 0);
    const totalSlr = datas.reduce(
      (partialSum, a) => partialSum + Number(a.salary?.split("$")[1]),
      0,
    );
    setTotalHours(totalHrs);
    setTotalSalary(totalSlr);
  };

  const open = (idx) => {};

  const SubHeader = () => {
    return (
      <Row>
        <Col md="2" fluid className="ml-3">
          <DatePicker
            id="example-datepicker"
            value={fromDate}
            onChange={(v, f) => handleChange(v, 1)}
          />
        </Col>
        <Col md="2" fluid className="ml-3">
          <DatePicker
            id="example-datepicker"
            value={toDate}
            onChange={(v, f) => handleChange(v, 2)}
          />
        </Col>
        <Col md="2" fluid className="ml-3">
          <Select
            value={employeeId}
            options={employees}
            onChange={(value) => {
              setEmployeeId(value);
            }}
          />
        </Col>
        <Col md="2" fluid className="ml-3">
          <Select
            value={projectLocationId}
            options={projectLocations}
            onChange={(value) => {
              setProjectLocationId(value);
            }}
          />
        </Col>
        <Col md="2" fluid className="ml-3">
          <Select
            value={type}
            options={[
              { value: 1, label: "Each" },
              { value: 2, label: "Total" },
            ]}
            onChange={(value) => {
              setType(value);
            }}
          />
        </Col>
      </Row>
    );
  };

  const Footer = () => {
    if (totalHours === 0) {
      return <></>;
    } else
      return (
        <div
          style={{ display: "flex", justifyContent: "end", marginRight: 20 }}
        >
          <div>
            <b>Total Hours: {totalHours}</b>
          </div>
          <div style={{ marginLeft: 20 }}>
            <b>Total Salary: ${totalSalary.toFixed(2)}</b>
          </div>
        </div>
      );
  };

  return (
    <>
      <Header />
      <div className="mt--7 w-screen">
        <List
          data={datas}
          fields={fields}
          name={"Projects"}
          onClick={open}
          isDownload={true}
          SubHeader={SubHeader}
          Footer={Footer}
        />
      </div>
    </>
  );
};

export default WorkHourScreen;

/*
  id                Int              @id @default(autoincrement())
  date              DateTime
  ProjectUsers      ProjectUser[]
  status            Status           @default(InUse)
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  ProjectLocation   ProjectLocation? @relation(fields: [projectLocationId], references: [id])
  workHour          workHours[]
  comment           String?
*/
