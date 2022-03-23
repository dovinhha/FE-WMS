import React, { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from "reactstrap";

import { Style } from "./style";
const Filter = () => {
  return (
    <Style>
      <Card>
        <CardHeader>
          <span style={{ cursor: "pointer" }} onClick={() => {}}>
            Đóng
          </span>
        </CardHeader>
        {/* <hr className="my-3"/> */}
        <CardBody>
          <FormGroup className="row">
            <Label
              className="form-control-label"
              htmlFor="example-text-input"
              md="5"
            >
              Lọc theo năm
            </Label>
            <Col md="7">
              <Input
                defaultValue="John Snow"
                id="example-text-input"
                type="select"
              >
                <option value="">Chọn năm</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label
              className="form-control-label"
              htmlFor="example-search-input"
              md="5"
            >
              Lọc theo trạng thái
            </Label>
            <Col md="7">
              <Input
                defaultValue="Tell me your secret ..."
                id="example-search-input"
                type="select"
              >
                <option value="">Lựa chọn</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup className="row">
            <Label
              className="form-control-label"
              htmlFor="example-email-input"
              md="5"
            >
              Lọc theo tỉnh thành
            </Label>
            <Col md="7">
              <Input
                defaultValue="argon@example.com"
                id="example-email-input"
                type="select"
              >
                <option value="">Chọn tỉnh</option>
              </Input>
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <button className="btn btn-secondary btn-lg btn-block">
            Xóa bộ lọc
          </button>
          <button className="btn btn-primary btn-lg btn-block">
            Áp dụng bộ lọc
          </button>
        </CardFooter>
      </Card>
    </Style>
  );
};

export default Filter;
