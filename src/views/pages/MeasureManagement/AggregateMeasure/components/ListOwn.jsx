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
import React, { useState } from "react";
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
import { LogoutCircle } from "assets/svg";
// const { SearchBar } = Search;
function ListOwn() {
	// const [isOpenModal, setIsOpenModal] = useState(false);
	// const [dataModal, setDataModal] = useState({});
	// const [openFilter, setOpenFilter] = useState(false);

	const history = useHistory();
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

	const boxAction = (row) => {
		console.log(row); //data of obj
		return (
			<>
				<button className="btn-none">
					<LogoutCircle />
				</button>
			</>
		);
	};
	const columns = [
		{
			dataField: "name",
			text: "",
			filter: customFilter(),
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
			dataField: "position",
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
			dataField: "office",
			text: "Đơn vị/Phòng ban",
		},
		{
			dataField: "age",
			text: "Size",
		},
		{
			dataField: "start_date",
			text: "Số đo 1",
			// hidden: true,
		},
		{
			dataField: "salary",
			text: "Số đo 2",
		},
		{
			dataField: "salary",
			text: "....",
		},
		{
			dataField: "age",
			text: "Hành động",
			formatter: boxAction,
		},
	];
	return (
		<>
			<PaginationProvider
				pagination={paginationFactory({
					custom: true,
					totalSize: data.length,
				})}
			>
				{({ paginationProps, paginationTableProps }) => (
					<div>
						<BootstrapTable
							keyField="id"
							data={data}
							columns={columns}
							filter={filterFactory()}
							bordered={false}
							{...paginationTableProps}
						/>
						<Row className="px-3 align-items-center">
							<Col className="d-flex">
								<p className="mb-0">Hiển thị </p>

								<SizePerPageDropdownStandalone {...paginationProps} />

								<p className="mb-0 mr-5">dòng.</p>
								<p>
									Hiển thị từ{" "}
									{(paginationProps.page - 1) * paginationProps.sizePerPage + 1}{" "}
									đến{" "}
									{paginationProps.page * paginationProps.sizePerPage >
									data.length
										? data.length
										: paginationProps.page * paginationProps.sizePerPage}{" "}
									trong số {data.length}
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
					</div>
				)}
			</PaginationProvider>

			{/* <DialogUpdateResult
				open={isOpenModal}
				data={dataModal}
				toggle={handleCloseModal}
			/> */}
		</>
	);
}

export default ListOwn;
