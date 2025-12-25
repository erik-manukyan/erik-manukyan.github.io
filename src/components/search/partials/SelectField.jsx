import React from "react";
import { DropdownList } from "react-widgets";

export default function SelectField({
  label,
  id,
  data = [],
  value,
  onChange,
  placeholder,
  textField = "label",
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <DropdownList
        className="form-control p-0"
        containerClassName="w-100"
        id={id}
        data={data}
        value={value || null}
        onChange={onChange}
        textField={textField}
        placeholder={placeholder}
      />
    </div>
  );
}
