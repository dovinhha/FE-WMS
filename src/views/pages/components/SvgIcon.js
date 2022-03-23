function createMarkup(svg) {
  return {
    __html: svg,
  };
}

function IconComponent({ svg }) {
  return <div dangerouslySetInnerHTML={createMarkup(svg)}></div>;
}

export default IconComponent;
