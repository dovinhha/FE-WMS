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
import React, { useEffect, useState } from "react";
// react plugin that prints a given react component

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory, {
  customFilter,
  textFilter,
  filterRenderer,
} from "react-bootstrap-table2-filter";

// react component used to create sweet alerts

// reactstrap components
import { Row, Col, Input } from "reactstrap";
// core components

import { useHistory } from "react-router-dom";
import { ViewSVG } from "assets/svg";
// import DialogUpdateResult from "./DialogUpdateResult";
import { Edit2SVG } from "assets/svg";
import { dataTable as data } from "variables/general";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "Redux/Actions/orderActions";
import _ from "lodash";
import queryString from "query-string";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import DialogUpdateDetailMeasure from "./DialogUpdateDetailMeasure";
import constants from "constant";
// const { SearchBar } = Search;
function ListResidual({ currentOrder, loading, setLoading }) {
  console.log(currentOrder);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [dataModal, setDataModal] = useState({});
  // const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const { unusualList, isGetUnusualList } = useSelector(
    (state) => state.orderReducer
  );
  const [listSize, setListSizes] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentMeasure, setCurrentMeasure] = useState({});
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const toggleOpenDialogUpdate = () => {
    setOpenDialogUpdate(!openDialogUpdate);
  };
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    orderId: currentOrder,
    customerInOrderSizeStatus:
      constants.CUSTOMER_IN_ORDER_SIZE_STATUS.FailedAssigned,
    populate:
      "sizes.productParameterId,customerOrgId,productTypeId,customerSizeId.sizes.productParameterId",
  });
  const handleGetUnusualList = () => {
    const payload = { ...query };
    if (payload.orderId == "") delete payload["orderId"];
    dispatch(orderActions.getUnusualList(queryString.stringify(payload)));
    setLoading(false);
  };
  useEffect(() => {
    if (currentOrder !== "") setQuery({ ...query, orderId: currentOrder });
  }, [currentOrder]);
  useEffect(() => {
    if (!_.isEmpty(unusualList.items)) {
      console.log(unusualList.items);
      const list = unusualList.items.map((item) => {
        const arr1 = item.sizes.map((i) => {
          return {
            name: i.productParameterId.name,
            id: i.productParameterId.id,
            code: i.productParameterId.code,
          };
        });
        const arr2 =
          item?.customerSizeId?.sizes?.map((i) => {
            return {
              name: i.productParameterId.name,
              id: i.productParameterId.id,
              code: i.productParameterId.code,
            };
          }) || [];
        console.log(arr1);
        console.log(arr2);
        return arr1.concat(arr2);
      });
      console.log(list);
      let items = [];
      list.forEach((item) => {
        items = items.concat(item);
      });
      items = items.filter(
        (v, i, a) => a.findIndex((item) => _.isEqual(item, v)) === i
      );
      // items = items.filter((v, i, a) => a.indexOf(v) === i);
      console.log(items);
      setListSizes(items);
    }
  }, [unusualList]);
  useEffect(() => {
    handleGetUnusualList();
  }, [query]);
  useEffect(() => {
    if (loading) handleGetUnusualList();
  }, [loading]);
  console.log(unusualList);
  const history = useHistory();

  const pagination = paginationFactory({
    page: page,
    onPageChange: (value) => {
      setPage(value);
      setQuery({ ...query, page: value });
    },
    sizePerPage: rowsPerPage,
    totalSize: unusualList?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > unusualList.items.length
              ? !isNaN(unusualList?.totalResults)
                ? unusualList.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số{" "}
            {!isNaN(unusualList?.totalResults) ? unusualList.totalResults : 0}{" "}
            bản ghi
          </p>
        </Col>
      </>
    ),
  });
  const handleView = (data) => {
    // console.log("Xem ");
    // history.push(`/plan-pending-apply/${data}`);
  };

  const handleEdit = (data) => {
    // setIsOpenModal(true);
    // setDataModal(data);
  };

  const handleCloseModal = () => {
    // setIsOpenModal(false);
    // setDataModal({});
  };

  const boxAction = (cell, row) => {
    return (
      <>
        <button
          className="btn-none"
          onClick={() => {
            toggleOpenDialogUpdate();
            setCurrentMeasure(row);
          }}
        >
          <ViewSVG />
        </button>
        <button
          className="btn-none"
          onClick={() => {
            handleEdit(row);
          }}
        >
          <Edit2SVG />
        </button>
      </>
    );
  };
  const columns = [
    {
      dataField: "customerCode",
      text: "",
      filter: textFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Mã nhân viên"
        />
      ),
    },
    {
      dataField: "customerName",
      text: "",
      filter: customFilter(),
      filterRenderer: (onFilter, column) => (
        <Input
          key="input"
          type="search"
          onChange={(e) => {
            onFilter(e.target.value);
          }}
          placeholder="Tên nhân viên"
        />
      ),
    },
    {
      dataField: "customerOrgId.name",
      text: "Đơn vị/Phòng ban",
    },
    {
      dataField: "age",
      text: "Ngày cập nhật",
    },
    ...listSize.map((item, idx) => {
      return {
        dataField: item.code,
        text: item.name,
        formatter: (cell, row) => {
          console.log(
            row?.customerSizeId?.sizes?.find(
              (value) => value.productParameterId.code === item.code
            )?.size || 0
          );
          const sd1 =
            row?.sizes?.find(
              (value) => value.productParameterId.code === item.code
            )?.size || "";
          const sd2 =
            row?.customerSizeId?.sizes?.find(
              (value) => value.productParameterId.code === item.code
            )?.size || "";
          // console.log(row);
          return (
            <>
              <p>{sd1 || sd2}</p>
              {sd1 && sd2 && <p className="text-danger">{sd1}</p>}
            </>
          );
        },
      };
    }),

    {
      dataField: "id",
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
      <ToolkitProvider
        data={[...unusualList.items]}
        keyField="id"
        columns={columns}
        search
      >
        {(props) => (
          <>
            {isGetUnusualList ? (
              <Row className="align-items-center ">
                <Col md="12" className="d-flex justify-content-center p-5">
                  <div class="spinner-border text-info" />
                </Col>
              </Row>
            ) : (
              <BootstrapTable
                {...props.baseProps}
                noDataIndication={() => {
                  return (
                    <span className="font-weight-bold text-danger">
                      Không có dữ liệu!
                    </span>
                  );
                }}
                hover
                // selectRow={selectRow}
                filter={filterFactory()}
                bootstrap4={true}
                pagination={pagination}
                bordered={false}
                striped
                condensed
              />
            )}
          </>
        )}
      </ToolkitProvider>
      {!_.isEmpty(currentMeasure) && (
        <DialogUpdateDetailMeasure
          open={openDialogUpdate}
          toggle={toggleOpenDialogUpdate}
          data={currentMeasure}
        />
      )}
      {/* <DialogUpdateResult
				open={isOpenModal}
				data={dataModal}
				toggle={handleCloseModal}
			/> */}
    </>
  );
}

export default ListResidual;
