import styled from "styled-components";

export const Style = styled.div`
	ul {
		list-style-type: none;
	}
	.filter {
		position: fixed;
		top: 0;
		right: 00px;
		width: 400px;
		height: 100vh;
		z-index: 10;
		transition: 0.3s;
		animation: animated 0.3s;
		@keyframes animated {
			0% {
				right: -400px;
			}
			100% {
				right: 0px;
			}
		}
	}
	.borderBottomActive {
		border-bottom: 2px solid #00bbf1;
	}
	.bigMenu {
		padding-left: 49px;
		padding-top: 20px;
		margin-left: 20px;
		border-left: 1px solid rgba(0, 0, 0, 0.3);
		& > li {
			&:last-child {
				&::after {
					top: calc(100% + 48px);
					right: calc(100% - 23px);
					width: 2px;
					height: 100%;
					content: "";
					z-index: 20;
					position: absolute;
					background-color: #fff;
				}
			}
		}
		& li {
			position: relative;
			width: max-content;
			display: block;
			padding: 15px 10px;
			// paddingBottom: 0,
			background-color: #fff;
			&::before {
				content: "";
				position: absolute;
				right: 100%;
				top: 25px;
				width: 49px;
				z-index: 10;
				height: 1px;
				background-color: rgba(0, 0, 0, 0.3);
			}
			&:last-child {
				&::after {
					content: "";
					position: absolute;
					right: calc(100% + 48px);
					top: calc(0% + 26px);
					width: 2px;
					z-index: 20;
					height: 100%;
					background-color: #fff;
				}
			}
		}
		& > .childMenu {
			&:last-child {
				&::before {
					content: "";
					position: absolute;
					background-color: red;
					top: 20px;
					left: -50px;
					width: 10px;
					height: 100%;
				}
			}
		}
		.childMenu {
			padding-left: 40px;
			margin-left: -20px;
			padding-top: 20px;
			position: relative;
			&::after {
				content: "";
				position: absolute;
				background-color: rgba(0, 0, 0, 0.3);
				top: -13px;
				left: -10px;
				width: 1px;
				height: 100%;
			}
			li:last-child {
				&::after {
					content: "";
					position: absolute;
					background-color: #fff;
					top: 26px;
					left: -50px;
					width: 1px;
					height: 100%;
				}
			}
		}
	}
	table {
		th {
			text-transform: inherit;
			border: none;
		}
		td,
		th {
			vertical-align: inherit;
		}
	}
`;
