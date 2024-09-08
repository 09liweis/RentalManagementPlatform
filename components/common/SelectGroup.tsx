interface SelectGroupProps {
  label: string;
  options: string[];
  value: string;
  handleSelect: (value: string) => void;
}

export default function SelectGroup({label,options,value,handleSelect}:SelectGroupProps) {
  return (
    <section className="select-options-container">
      {options.map((option)=>
      <span key={option} className={`select-option ${value === option ? "active" : ""}`} onClick={()=>handleSelect(option)}>{option}</span>
      )}
    </section>
  );
}