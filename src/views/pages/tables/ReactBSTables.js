/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin that prints a given react component
import ReactToPrint from "react-to-print";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import styled from "styled-components";
import { dataTable } from "variables/general";
import { ViewSVG } from "assets/svg";
import { EditSVG } from "assets/svg";
import { BinSVG } from "assets/svg";

const OptionSelect = styled.div`
  .dropdown {
    margin: 0 0.5rem;
    button {
      background: none;
      color: #000;
      &:focus {
        background: none;
        color: #000;
      }
      &:focus {
        background: none;
        color: #000;
      }
      &:active {
        background: none !important;
        color: #000 !important;
      }
    }
  }

  ul {
    min-width: 100%;
    max-width: 100%;
  }
  li {
    padding: 0;
  }
  a {
    padding: 0.5rem 0.75rem;
    display: block;
  }
  .table {
    border: none;
    border-bottom: 1px solid #000;
  }
`;
const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  // custom:true,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{" "}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{" "}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;
function createMarkup(svg) {
  return {
    __html: svg,
  };
}

function IconComponent({ svg }) {
  return <div dangerouslySetInnerHTML={createMarkup(svg)}></div>;
}
function ReactBSTables({ nameTable, data }) {
  const [alert, setAlert] = React.useState(null);
  const componentRef = React.useRef(null);
  // this function will copy to clipboard an entire table,
  // so you can paste it inside an excel or csv file
  const handleView = (id) => {};
  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  const boxAction = (cell, row, rowIndex, formatExtraData) => {
    //console.log(cell); // data of cell
    //console.log(row); //data of obj
    //console.log(rowIndex); //index row
    //console.log(formatExtraData); //data from formatExtraData
    return (
      <>
        <button
          style={{
            padding: 0,
            border: "none",
            marginRight: ".5rem",
            background: "none",
          }}
          onClick={handleView}
        >
          <ViewSVG />
        </button>
        <button
          style={{
            padding: 0,
            border: "none",
            marginRight: ".5rem",
            background: "none",
          }}
          onClick={handleEdit}
        >
          <EditSVG />
        </button>

        <button
          onClick={handleDelete}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <BinSVG />
        </button>
      </>
    );
  };
  const copyToClipboardAsTable = (el) => {
    var body = document.body,
      range,
      sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand("copy");
    } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
    }
    setAlert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Good job!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="info"
        btnSize=""
      >
        Copied to clipboard!
      </ReactBSAlert>
    );
  };
  const columns = [
    {
      dataField: "name",
      text: "",
      filter: textFilter({
        placeholder: "Mã đơn hàng",
      }),
    },
    {
      dataField: "position",
      text: "",
      filter: textFilter({
        placeholder: "Tên đơn hàng",
      }),
    },
    {
      dataField: "office",
      text: "",
      filter: textFilter({
        placeholder: "Tên khách hàng",
      }),
    },
    {
      dataField: "age",
      text: "",
      filter: textFilter({
        placeholder: "Giai đoạn",
      }),
    },
    {
      dataField: "start_date",
      text: "Trạng thái",
      // hidden: true,
    },
    {
      dataField: "salary",
      text: "Hành động",
    },
    {
      dataField: "salary",
      text: "Hành động",
      formatter: boxAction,
      formatExtraData: {
        name: "nam",
        age: "20",
      },
    },
  ];
  return (
    <>
      {alert}
      <SimpleHeader name="Quản lý đơn hàng" parentName="Quản lý" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <PaginationProvider
                pagination={paginationFactory({
                  custom: true,
                  totalSize: dataTable.length,
                })}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <div>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">Danh sách đơn hàng</h3>
                        </CardHeader>
                      </Col>
                      <Col
                        className="d-flex align-items-center mr-4"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <p className="mb-0">Hiển thị </p>
                        <OptionSelect>
                          <SizePerPageDropdownStandalone {...paginationProps} />
                        </OptionSelect>
                        <p className="mb-0">dòng</p>
                      </Col>
                    </Row>

                    <BootstrapTable
                      keyField="id"
                      data={dataTable}
                      columns={columns}
                      bordered={false}
                      // cellEdit={cellEditFactory({ mode: "click" })}
                      filter={filterFactory()}
                      {...paginationTableProps}
                    />
                    <Row className="px-3 align-items-center">
                      <Col>
                        {/* <PaginationTotalStandalone {...paginationProps} /> */}
                        <p>
                          Hiển thị từ{" "}
                          {(paginationProps.page - 1) *
                            paginationProps.sizePerPage +
                            1}{" "}
                          đến{" "}
                          {paginationProps.page * paginationProps.sizePerPage >
                          dataTable.length
                            ? dataTable.length
                            : paginationProps.page *
                              paginationProps.sizePerPage}{" "}
                          trong số {dataTable.length}
                        </p>
                      </Col>
                      <Col
                        style={{
                          marginLeft: "auto",
                          flexDirection: "row-reverse",
                        }}
                        className="d-flex align-items-center"
                      >
                        <PaginationListStandalone {...paginationProps} />
                      </Col>
                    </Row>
                    {/* <PaginationListStandalone {...paginationProps} /> */}
                  </div>
                )}
              </PaginationProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ReactBSTables;
