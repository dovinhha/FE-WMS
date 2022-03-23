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
			/* background-color: transparent; */
		}

		th {
			vertical-align: inherit;
		}
	}
	.show {
		width: 100%;
		position: relative;
		.demo {
			position: relative;
			top: -2rem;
			left: 0;
			width: 100%;
			aspect-ratio: 4/3;
			border-radius: 6px;
			border: 1px dashed #dee2e6;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 100;
			background-color: #fff;
		}
	}
`;
