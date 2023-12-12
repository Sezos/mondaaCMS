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
import { Outlet } from "react-router-dom";

import {
    Card,
    CardHeader,
    Table,
    Row,
    Col,
    Container,
    Button,
    CardBody,
    CardImg,
} from "reactstrap";
// reactstrap components

import Header from "components/Headers/Header.js";
import services from "../service/service";
import { useParams } from "react-router-dom";

const Filez = ({ props }) => {
    let { id } = useParams();
    const [file, setFile] = useState({});
    useEffect(() => {
        console.log(id);
        fetch();
    }, []);

    const fetch = async () => {
        const file = await services.getFile(id);
        setFile(file);
    };

    return (
        <>
            <Header />
            <div className="mt--7 w-screen">
                <Container
                    fluid
                    style={{
                        width: "90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Row>
                        <div className="col">
                            <Card
                                className="shadow"
                                style={{
                                    width: "70rem",
                                }}
                            >
                                <CardHeader className="border-0">
                                    <Row>
                                        {id !== 1 ? (
                                            <Col md="1">
                                                <Button
                                                    style={{
                                                        boxShadow: "none",
                                                        padding: "0px",
                                                    }}
                                                    onClick={() => {
                                                        window.history.back();
                                                    }}
                                                >
                                                    {"<"}
                                                </Button>
                                            </Col>
                                        ) : (
                                            <></>
                                        )}
                                        <Col md="10">
                                            <h3 className="mb-0">
                                                {id === 1 ? "Files" : file.name}
                                            </h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Card>
                                        <CardImg
                                            alt="Card image cap"
                                            src={
                                                "https://mondaa-bucket.s3.ap-southeast-2.amazonaws.com/" +
                                                file.url
                                            }
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <h3>Comment:</h3>
                                            <div>{file.comment}</div>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </div>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
            <Outlet />
        </>
    );
};

export default Filez;

/*
  id            Int     @id @default(autoincrement())
  name          String  @db.VarChar(255)
  url           String? @db.VarChar(255)
  ownerId       Int     @default(8)
  thumbnail_url String? @db.VarChar(255)
  isFolder      Boolean @default(false)
  Owner         User    @relation(fields: [ownerId], references: [id])
  parentId      Int     @default(0)
  children      Files[] @relation("Parent")
  parent        Files   @relation("Parent", fields: [parentId], references: [id])
  status        Status  @default(InUse)
  isChecked     Boolean @default(false)
*/
