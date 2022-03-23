import { FileClipboardBlockSVG } from "assets/svg";
import { FileClipboardCheckSVG } from "assets/svg";
import { FileClipboardTextSVG } from "assets/svg";
import React, { useState } from "react";
import { Card, CardHeader, Container } from "reactstrap";
import { Style } from "../style";
import Filter from "./components/Filter";
import Header from "./components/Header";
import ListOwn from "./components/ListOwn";
import ListResolved from "./components/ListResolved";

const AggregateMeasure = () => {
	const [sectionState, setSectionState] = useState(0);
	const [openFilter, setOpenFilter] = useState(false);
	const changeSectionState = (number) => {
		setSectionState(number);
	};
	const toggleOpenFilter = () => {
		setOpenFilter(!openFilter);
	};
	return (
		<Style>
			<Header name="Quản lý số đo" toggle={toggleOpenFilter} />
			<Container fluid className="mt--6">
				<Card>
					<CardHeader className="py-0">
						<div className="d-flex">
							<div
								onClick={() => {
									changeSectionState(0);
								}}
								className={`d-flex sidenav-toggler py-3 align-items-center mr-4 ${
									sectionState === 0 ? "nav-active" : ""
								}`}
							>
								<FileClipboardCheckSVG />
								<p
									className={`h5 text-uppercase font-weight-500 mb-0 ml-2 ${
										sectionState !== 0 ? "text-muted" : ""
									}`}
								>
									Danh sách đã quy size (10)
								</p>
							</div>
							<div
								onClick={() => {
									changeSectionState(1);
								}}
								className={`d-flex sidenav-toggler py-3 align-items-center mr-4 ${
									sectionState === 1 ? "nav-active" : ""
								}`}
							>
								<FileClipboardTextSVG />
								<p
									className={`h5 text-uppercase font-weight-500 mb-0 ml-2 ${
										sectionState !== 1 ? "text-muted" : ""
									}`}
								>
									Danh sách may riêng (10)
								</p>
							</div>
						</div>
					</CardHeader>
					{sectionState === 0 ? <ListResolved /> : <ListOwn />}
				</Card>
			</Container>
			<Filter open={openFilter} toggle={toggleOpenFilter} />
		</Style>
	);
};

export default AggregateMeasure;
