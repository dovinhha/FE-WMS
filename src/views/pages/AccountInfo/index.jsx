import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import classnames from "classnames";
import SvgIcon from "views/pages/components/SvgIcon";
import { Style } from "./style";
import Header from "./components/Header";
import AccInfo from "./components/AccInfo";
import ChangePassword from "./components/ChangePassword";
import { useParams, useHistory } from "react-router-dom";

const AccountInfo = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const history = useHistory();
  const { tab } = useParams();

  useEffect(() => {
    setCurrentTab(parseInt(tab));
  }, [tab]);

  const toggle = (value) => {
    if (currentTab !== parseInt(value)) {
      history.push(`/account-info/0001/${value}`);
      setCurrentTab(parseInt(value));
    }
  };
  return (
    <Style>
      <Header name="Thiết lập tài khoản" />
      <Container fluid className="mt--6">
        <Card className="p-4">
          <CardHeader className="py-0">
            <Row className="mx-0">
              <Row
                className={`align-items-center py-3 mx-0 ${
                  currentTab === 0 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggle(0);
                }}
              >
                <SvgIcon
                  svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  
                  <g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
                      <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></circle>
                      <line x1="7" y1="7" x2="7" y2="10.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
                      <circle cx="7" cy="4.5" r="0.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></circle>
                    </g></g></svg>`}
                />

                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    currentTab !== 0 && "text-muted"
                  }`}
                >
                  Thông tin chung
                </p>
              </Row>
              <Row
                className={`align-items-center py-3 ml-5 mx-0 ${
                  currentTab === 1 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggle(1);
                }}
              >
                <SvgIcon
                  svg={`<svg style="width:20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  
                  <g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
                      <circle cx="6.44" cy="11.33" r="2.17" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></circle>
                      <path d="M8,9.8l3.86-3.86a.36.36,0,0,1,.51,0L13.5,7.09" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
                      <line x1="10.45" y1="7.37" x2="11.47" y2="8.39" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
                      <path d="M2,12.5H1.5a1,1,0,0,1-1-1V1.5a1,1,0,0,1,1-1h11a1,1,0,0,1,1,1V4" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></path>
                      <line x1="0.5" y1="3.5" x2="13.5" y2="3.5" style="fill: none;stroke: #FC6430;stroke-linecap: round;stroke-linejoin: round"></line>
                    </g></g></svg>`}
                />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    currentTab !== 1 && "text-muted"
                  }`}
                >
                  Đổi mật khẩu
                </p>
              </Row>
            </Row>
          </CardHeader>
          <CardBody>
            {currentTab === 0 ? <AccInfo /> : <ChangePassword />}
          </CardBody>
        </Card>
      </Container>
    </Style>
  );
};

export default AccountInfo;
