import React from "react";
import { Col, Row } from "reactstrap";
import IconComponent from "utils/createSVG";

const BoxComment = () => {
	return (
		<div className="box-comment">
			<Row>
				<Col>
					<Row className="align-items-center">
						<IconComponent
							svg={`<svg style='width:20px;height:20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  
<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
    <circle cx="7" cy="5.5" r="2.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></circle>
    <path d="M2.73,11.9a5,5,0,0,1,8.54,0" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></path>
    <circle cx="7" cy="7" r="6.5" style="fill: none;stroke: #453242;stroke-linecap: round;stroke-linejoin: round"></circle>
  </g></g></svg>`}
						/>
						<p className=" h3 mb-0 ml-2">Nguyễn Văn Nam</p>
					</Row>
				</Col>
				<Col className="text-md-right">25/4/2021</Col>
			</Row>
			<p className="mt-3 text-black">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
				inventore recusandae facilis, magnam, tempore excepturi eius corrupti
				provident ex eum doloremque reprehenderit. Quasi aspernatur, beatae esse
				exercitationem illo quo sit.
			</p>
		</div>
	);
};

export default BoxComment;
