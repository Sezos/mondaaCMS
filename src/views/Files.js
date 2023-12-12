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
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Col,
    Container,
    Button,
    CardImg,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    CardBody,
} from "reactstrap";
// reactstrap components

import FileSaver from "file-saver";

import Header from "components/Headers/Header.js";
import services from "../service/service";
import JSZip from "jszip";

const FileScreen = ({ props }) => {
    const fields = ["id", "image", "name", "isChecked"];
    const [folder, setFolder] = useState({});
    const [datas, setDatas] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [myFolderId, setMyFolderId] = useState(1);

    const [metaKey, setMetaKey] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);
    const [nest, setNest] = useState([{ id: 1, name: "Files" }]);

    useEffect(() => {
        _fetch();
    }, [myFolderId]);

    const enter = (e) => {
        if (e.key === "Meta" || e.key === "Control") {
            setMetaKey(true);
        }
        if (e.key === "Shift") {
            setShiftKey(true);
        }
    };
    const leave = (e) => {
        if (e.key === "Meta" || e.key === "Control") {
            setMetaKey(false);
        }
        if (e.key === "Shift") {
            setShiftKey(false);
        }
    };

    const check = async () => {
        await services.checkFile(selectedFile?.id);
        setDatas(
            datas.map((dat) =>
                dat.id === selectedFile.id
                    ? { ...dat, isChecked: !dat.isChecked }
                    : dat
            )
        );
        setSelectedFile({
            ...selectedFile,
            isChecked: !selectedFile.isChecked,
        });
    };
    const checkFolder = async () => {
        await services.checkFile(folder?.id);
        setDatas(
            datas.map((dat) =>
                dat.id === folder.id
                    ? { ...dat, isChecked: !dat.isChecked }
                    : dat
            )
        );
        setFolder({
            ...folder,
            isChecked: !folder.isChecked,
        });
    };

    const onDownload = async () => {
        FileSaver.saveAs(
            "https://mondaa-bucket.s3.ap-southeast-2.amazonaws.com/" +
                selectedFile.url,
            selectedFile.name
        );
        check();
    };

    const onDelete = async () => {};

    useEffect(() => {
        document.addEventListener("keydown", enter, true);
        document.addEventListener("keyup", leave, true);
        return () => {
            document.addEventListener("keydown", enter, true);
            document.addEventListener("onkeyup", leave, true);
        };
    }, []);

    const _fetch = async () => {
        const folder = await services.getFile(myFolderId);
        setFolder(folder);
        console.log(folder);
        const data = await services.getFiles(myFolderId);
        setDatas(data.map((dat) => ({ ...dat, selected: false })));
    };

    const open = (dat) => {
        if (dat.isFolder) {
            setMyFolderId(dat.id);
            setNest([...nest, { name: dat.name, id: dat.id }]);
        } else {
            setSelectedFile(dat);
        }
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
                                    <Row
                                        style={{
                                            height: "3rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ display: "flex" }}>
                                            {nest.map((ne, idx) => {
                                                return (
                                                    <div>
                                                        {idx !== 0 ? "<" : ""}
                                                        <Button
                                                            onClick={() => {
                                                                setMyFolderId(
                                                                    ne.id
                                                                );
                                                                setNest(
                                                                    nest.splice(
                                                                        0,
                                                                        idx + 1
                                                                    )
                                                                );
                                                            }}
                                                            style={{
                                                                backgroundColor:
                                                                    "white",
                                                                border: "none",
                                                                boxShadow:
                                                                    "none",
                                                            }}
                                                        >
                                                            {ne.name}
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {folder.id !== 1 ? (
                                            <Button
                                                style={{
                                                    backgroundColor: "white",
                                                    boxShadow: "none",
                                                    border: "none",
                                                }}
                                                onClick={checkFolder}
                                            >
                                                <FaStar
                                                    style={{
                                                        color: folder.isChecked
                                                            ? "green"
                                                            : "black",
                                                    }}
                                                />
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </Row>
                                </CardHeader>
                                {datas.filter((data) => data.isFolder)
                                    .length !== 0 ? (
                                    <CardBody>
                                        <div>Folders</div>
                                        <Row>
                                            {datas
                                                .filter((data) => data.isFolder)
                                                .map((data, index) => {
                                                    return (
                                                        <Col md="3">
                                                            <Folder
                                                                data={data}
                                                                onClick={open}
                                                                check={check}
                                                            />
                                                        </Col>
                                                    );
                                                })}
                                        </Row>
                                    </CardBody>
                                ) : (
                                    <></>
                                )}
                                {datas.filter((data) => !data.isFolder)
                                    .length !== 0 ? (
                                    <CardBody>
                                        <div>Files</div>
                                        <Row>
                                            {datas
                                                .filter(
                                                    (data) => !data.isFolder
                                                )
                                                .map((data, index) => {
                                                    return (
                                                        <Col md="3">
                                                            <File
                                                                data={data}
                                                                onClick={open}
                                                                check={check}
                                                            />
                                                        </Col>
                                                    );
                                                })}
                                        </Row>
                                    </CardBody>
                                ) : (
                                    <></>
                                )}
                            </Card>
                        </div>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
            <Modal
                isOpen={selectedFile !== null}
                toggle={() => {
                    setSelectedFile(null);
                }}
                size="xl"
            >
                <ModalHeader
                    toggle={() => {
                        setSelectedFile(null);
                    }}
                    style={{
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <h3 className="mb-0">{selectedFile?.name}</h3>
                        <Button
                            style={{
                                marginLeft: "50px",
                                boxShadow: "none",
                                border: "none",
                                backgroundColor: "white",
                                padding: 0,
                            }}
                            onClick={onDownload}
                        >
                            Download
                        </Button>
                        <Button
                            style={{
                                marginLeft: "50px",
                                boxShadow: "none",
                                border: "none",
                                backgroundColor: "white",
                                padding: 0,
                                color: selectedFile?.isChecked
                                    ? "green"
                                    : "black",
                            }}
                            onClick={check}
                        >
                            <FaStar />
                        </Button>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardImg
                            alt="Card image cap"
                            src={
                                "https://mondaa-bucket.s3.ap-southeast-2.amazonaws.com/" +
                                selectedFile?.url
                            }
                            top
                            width="100%"
                        />
                        <CardBody>
                            <h3>Comment:</h3>
                            <div>{selectedFile?.comment}</div>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setSelectedFile(null);
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

const Folder = ({ data, onClick }) => {
    const [isHover, setIsHover] = useState(false);
    const ref = useRef();

    const hoverStyle = {
        backgroundColor: "#e2e5e9",
    };
    const style = {
        backgroundColor: data.isChecked ? "green" : "#F3F6FB",
        boxShadow: "none",
        minWidth: "12rem",
        height: "3rem",
        display: "flex",
        borderRadius: "20px",
        alignItems: "center",
        marginBottom: "20px",
        overflow: "hidden",
    };

    return (
        <Button
            ref={ref}
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
            style={isHover ? { ...style, ...hoverStyle } : style}
            onClick={() => {
                onClick(data);
            }}
        >
            <i className="ni ni-folder-17" />
            {data.name}
        </Button>
    );
};

const File = ({ data, onClick, check }) => {
    const [isHover, setIsHover] = useState(false);

    const hoverStyle = {
        backgroundColor: data.selected === false ? "#e2e5e9" : "#c9e6fd",
    };
    const style = {
        backgroundColor: data.selected === false ? "#F3F6FB" : "#c9e6fd",
        boxShadow: "none",
        minWidth: "12rem",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
        marginBottom: "20px",
        cursor: "pointer",
    };

    return (
        <Card
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
            style={isHover ? { ...style, ...hoverStyle } : style}
            onClick={() => {
                onClick(data);
            }}
        >
            <CardHeader>
                {data.name}
                <FaStar style={{ color: data.isChecked ? "green" : "black" }} />
            </CardHeader>
            <CardBody style={{ padding: "10px" }}>
                <CardImg
                    alt="Card image cap"
                    style={{
                        objectFit: "cover",
                    }}
                    src={
                        "https://mondaa-bucket.s3.ap-southeast-2.amazonaws.com/" +
                        data.url
                    }
                    bottom
                    width="100%"
                    height="150rem"
                />
            </CardBody>
        </Card>
    );
};

export default FileScreen;

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
