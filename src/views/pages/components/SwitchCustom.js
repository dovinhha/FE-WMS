import React from "react";

const SwitchCustom = ({
  value,
  checked,
  defaultChecked,
  labelOff,
  labelOn,
  onChange,
  className,
}) => {
  return (
    <label className={className}>
      <input
        value={value}
        defaultChecked={defaultChecked}
        checked={checked}
        type="checkbox"
        onChange={(e) => {
          onChange(e);
        }}
      />
      <span
        className="custom-toggle-slider rounded-circle"
        data-label-off={labelOff}
        data-label-on={labelOn}
      />
    </label>
  );
};

export default SwitchCustom;
