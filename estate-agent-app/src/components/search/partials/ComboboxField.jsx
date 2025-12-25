import React from "react";
import { Combobox } from "react-widgets";

export default function ComboboxField({
  label,
  id,
  data = [],
  value,
  onChange,
  placeholder,
  noWrapper = false,
}) {
  const combobox = (
    <Combobox
      className="form-control p-0"
      containerClassName="w-100"
      id={id}
      data={data}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  if (noWrapper) return combobox;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      {combobox}
    </div>
  );
}
