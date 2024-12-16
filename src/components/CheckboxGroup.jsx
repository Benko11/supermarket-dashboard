export default function CheckboxGroup({
  name,
  labels,
  currentValues,
  onChange,
}) {
  if (labels == null || labels.length < 1) return;
  return labels.map((label, index) => (
    <div key={index}>
      <input
        type="checkbox"
        name={name}
        id={`${name}-${index}`}
        value={index}
        checked={currentValues.includes(index)}
        onChange={onChange}
      />
      <label htmlFor={`${name}-${index}`} className="ingredient">
        {label}
      </label>
    </div>
  ));
}
