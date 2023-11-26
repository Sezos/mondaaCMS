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
import { Col } from "reactstrap";

const ProjectScreen = (props) => {
    const fields = ["id", "name", "date", "comment"];

    const [datas, setDatas] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [fmtValue, setFmtValue] = useState(undefined);

    function handleChange(value, formattedValue) {
        setDate(value);
        setFmtValue(formattedValue);
    }

    useEffect(() => {
        fetch();
    }, [date]);

    const fetch = async () => {
        const data = await services.getProjects(date.split("T")[0]);
        console.log(date.split("T")[0], data);
        setDatas(
            data.map((dat) => {
                return {
                    ...dat,
                    name: dat.ProjectLocation.name,
                };
            })
        );
    };

    const open = (idx) => {};

    return (
        <>
            <Header />
            <Col md="2" fluid className="mt--8 ml-3">
                <DatePicker
                    id="example-datepicker"
                    value={date}
                    onChange={(v, f) => handleChange(v, f)}
                />
            </Col>
            <div className="mt-5 w-screen">
                <List
                    data={datas}
                    fields={fields}
                    name={"Projects"}
                    onClick={open}
                />
            </div>
        </>
    );
};

export default ProjectScreen;

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
