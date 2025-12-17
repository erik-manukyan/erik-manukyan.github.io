export default function FormSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} className="form-select">
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
