import styled from "styled-components";

export const Style = styled.div`
	.dropdown {
		margin: 0 0.5rem;
		button {
			background: none !important;
			color: #8898aa;
			padding: 0.33rem 0.75rem;
			border: 1px solid #dee2e6;
			&:focus {
				background: none !important;
				color: #8898aa;
				border: 1px solid #dee2e6;
			}
			&:focus {
				background: none !important;
				color: #8898aa;
				border: 1px solid #dee2e6;
			}
			&:active {
				background: none !important;
				color: #8898aa;
				border: 1px solid #dee2e6;
			}
		}
		ul {
			min-width: 100% !important;
			max-width: 100% !important;
		}
	}
	.filterOption {
		position: fixed;
		top: 0;
		right: -400px;
		width: 400px;
		height: 100vh;
		transition: 0.3s;
		z-index: 10;
		&.show {
			right: 0px;
		}
	}
	.borderBottomActive {
		border-bottom: 2px solid #00bbf1;
	}
	.btn-none {
		border: none;
		background-color: transparent;
		padding: 0;
		margin-right: 0.5rem;
	}
	.text-white {
		color: #fff !important;
		background-color: transparent;
	}
	.header {
		button {
			padding: 0.7rem 0.9rem;
		}
	}
	table {
		thead {
			th {
				text-transform: inherit;
				background-color: transparent;
				padding-left: 0.5rem !important;
				padding-right: 0.5rem !important;
			}
		}
		td {
			padding-left: 0.5rem !important;
			padding-right: 0.5rem !important;
		}
		input {
			background-color: transparent !important;
			box-shadow: none !important;
			border: none;
			border-bottom: 1px solid #000;
			border-radius: 0px;
			padding: 0;
			height: 2rem;
			/* font-size: 1rem; */
		}
		th {
			vertical-align: inherit !important;
		}
	}
	.customHeader {
		tr {
			td {
				border: none;
				padding: 0.5rem;
				font-size: 10.4px;
				text-align: center;
			}
		}
		tr:last-child {
			td {
				border-top: 1px solid rgba(0, 0, 0, 0.3);
				font-weight: 400;
			}
		}
	}
	.nav-active {
		position: relative;
		&::after {
			content: "";
			position: absolute;
			top: 100%;
			left: 0;
			height: 2px;
			width: 100%;
			background-color: #00bbf1;
		}
	}
`;
