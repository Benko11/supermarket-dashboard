export default function RadioGroup({
  name,
  values,
  labels,
  onChange,
  currentValue,
}) {
  return (
    <div>
      {values.map((value, index) => (
        <div key={value}>
          <input
            type="radio"
            name={name}
            id={`${name}-${value}`}
            value={value}
            onChange={onChange}
            checked={currentValue === value}
          />
          <label htmlFor={`${name}-${value}`}>{labels[index]}</label>
        </div>
      ))}
    </div>
  );
}
