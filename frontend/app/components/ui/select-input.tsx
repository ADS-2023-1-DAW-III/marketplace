export default function SelectInput({
  options = [{ value: '', label: '' }],
  defaultValue = "",
  onChange = (value: string) => {},
  className = "",
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <select
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`w-full pl-4 pr-10 py-2 rounded border border-white text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white appearance-none ${className}`}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="text-black bg-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white pointer-events-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  );
}