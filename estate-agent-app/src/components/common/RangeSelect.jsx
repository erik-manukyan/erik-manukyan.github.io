export default function RangeSelect({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  options,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
}) {
  return (
    <div>
      <label className="form-label d-block">{label}</label>
      <div className="row g-2">
        <div className="col-md-6">
          <select
            value={minValue}
            onChange={onMinChange}
            className="form-select"
          >
            <option value="">{minPlaceholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select
            value={maxValue}
            onChange={onMaxChange}
            className="form-select"
          >
            <option value="">{maxPlaceholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
