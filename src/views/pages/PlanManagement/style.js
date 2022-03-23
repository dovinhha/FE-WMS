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

	li {
		padding: 0;
	}
	a {
		padding: 0.5rem 0.75rem;
		display: block;
	}
	.table {
		border: none;
	}
	.table_data {
		th,
		td {
			padding: 1rem !important;
		}
	}
	.btn-none {
		padding: 0;
		border: none;
		margin-right: 0.5rem;
		background-color: transparent;
		position: relative;
		&::after {
			position: absolute;
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%);
			padding: 0.125rem 0.25rem;
			font-size: 13px;
			background-color: #000;
			color: #fff;
			border-radius: 5px;
			opacity: 0;
			transition: 0.3s;
		}
		&:hover::after {
			opacity: 1;
		}
	}
	.btn-view {
		&::after {
			content: "Xem chi tiết";
		}
	}
	.btn-edit {
		&::after {
			content: "Cập nhật kế hoạch";
		}
	}
	.btn-addWork {
		&::after {
			content: "Đang chờ duyệt";
		}
	}
	input[type="date"]:disabled {
		background-color: transparent;
	}
	.text-black {
		color: #000000 !important;
	}
	.box-comment {
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		&:last-child {
			border: none;
		}
	}
	table {
		th {
			text-transform: inherit;
			background-color: transparent;
		}
		input {
			height: 2rem;
			border: none;
			border-radius: 0px;
			background-color: transparent !important;
			padding: 0;
			box-shadow: none !important;

			border-bottom: 1px solid #000;
		}
		th {
			vertical-align: inherit;
		}
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
`;
