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
		background-color: transparent;
		margin-right: 0.5rem;
		&:last-child {
			margin-right: 0;
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
	.header {
		button {
			padding: 0.7rem 0.9rem;
		}
	}
`;
