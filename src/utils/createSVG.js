function createMarkup(svg) {
	return {
		__html: svg,
	};
}

function IconComponent({ svg }) {
	return (
		<div
			style={{ cursor: "pointer" }}
			dangerouslySetInnerHTML={createMarkup(svg)}
		></div>
	);
}

export default IconComponent;
