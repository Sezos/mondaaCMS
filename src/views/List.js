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

// reactstrap components
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Table,
    Row,
    Col,
    Container,
    Button,
    CardBody,
} from "reactstrap";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}

const List = (props) => {
    const { fields, data, name, onClick, isDownload, SubHeader } = props;
    const [sortBy, setSortBy] = useState(fields[0]);
    const [datas, setDatas] = useState(data);

    useEffect(() => {
        setDatas(data.sort(dynamicSort(sortBy || fields[0])));
    }, [sortBy, data, datas, setDatas, fields]);

    async function createExcel(headers, rows) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Worksheet");
        sheet.columns = headers;
        console.log(headers, rows);
        for (let i = 0; i < rows.length; i++) {
            sheet.addRow(rows[i]);
        }
        return await workbook.xlsx.writeBuffer();
    }

    const download = async () => {
        const stream = await createExcel(
            fields.map((dat) => {
                return { header: dat, key: dat };
            }),
            datas
        );
        saveAs(new Blob([stream]), "lmao.xlsx");
    };

    return (
        <>
            <Container
                fluid
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Row>
                    <div className="col">
                        <Card className="shadow" style={{ minWidth: "1000px" }}>
                            <CardHeader className="border-0">
                                <Row>
                                    <Col md="10">
                                        <h3 className="mb-0">{name}</h3>
                                    </Col>
                                    {isDownload ? (
                                        <Col>
                                            <Button onClick={download}>
                                                Download
                                            </Button>
                                        </Col>
                                    ) : (
                                        <></>
                                    )}
                                </Row>
                                {SubHeader ? <SubHeader /> : <></>}
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="thead-light">
                                        <tr>
                                            {fields.map((field, idx) => {
                                                return (
                                                    <th
                                                        scope="col"
                                                        key={idx}
                                                        onClick={() => {
                                                            if (
                                                                sortBy === field
                                                            ) {
                                                                setSortBy(
                                                                    "-" + field
                                                                );
                                                            } else
                                                                setSortBy(
                                                                    field
                                                                );
                                                        }}
                                                        style={{
                                                            userSelect: "none",
                                                            MozUserSelect:
                                                                "none",
                                                            WebkitUserSelect:
                                                                "none",
                                                            msUserSelect:
                                                                "none",
                                                            cursor: "pointer",
                                                            color:
                                                                sortBy ===
                                                                    field ||
                                                                sortBy ===
                                                                    "-" + field
                                                                    ? "black"
                                                                    : "",
                                                        }}
                                                    >
                                                        {field}
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.map((dat, idx) => {
                                            return (
                                                <tr
                                                    key={idx}
                                                    onClick={() => {
                                                        onClick(idx);
                                                    }}
                                                >
                                                    {fields.map((field, id) => {
                                                        return (
                                                            <td key={id}>
                                                                {dat[field]}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </div>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
};

export default List;
