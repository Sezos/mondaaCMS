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
import { Card, CardHeader, Container } from "reactstrap";

// core components

import Header from "components/Headers/Header.js";

const Index = (props) => {
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card>
                    <CardHeader
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bolder",
                            minHeight: "500px",
                        }}
                    >
                        <h1>Mondaa Group PTY LTD</h1>
                    </CardHeader>
                </Card>
            </Container>
        </>
    );
};

export default Index;
