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
import React, { useContext } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
function Header({ name, parentName }) {
	const history = useHistory();
	return (
		<>
			<div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
				<Container fluid>
					<div className="header-body">
						<Row className="align-items-center py-4">
							<Col lg="6" xs="7">
								<h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
									{name}
								</h6>{" "}
							</Col>
							<Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
								<Button
									className="btn-neutral"
									color="default"
									size="md"
									onClick={() => {
										history.push("/add-standards");
									}}
								>
									Thêm mới
								</Button>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
}

Header.propTypes = {
	name: PropTypes.string,
	parentName: PropTypes.string,
};

export default Header;
