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

const ProjectLocationScreen = (props) => {
    const fields = ["id", "name", "location", "forman"];

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        const data = await services.getProjectLocations();
        console.log(data);
        setDatas(
            data.map((dat) => {
                return {
                    ...dat,
                    forman: dat.Forman.firstName,
                };
            })
        );
    };

    const open = (idx) => {};

    return (
        <>
            <Header />
            <div className="mt--7">
                <List
                    data={datas}
                    fields={fields}
                    name={"Project Location"}
                    onClick={open}
                />
            </div>
        </>
    );
};

export default ProjectLocationScreen;

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
