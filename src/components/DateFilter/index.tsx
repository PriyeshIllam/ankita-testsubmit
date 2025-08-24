import { useState } from "react";

interface DateFilterProps {
  onChange?: (date: string) => void;
}

export default function DateFilter({ onChange }: DateFilterProps) {
  const [date, setDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <div>
      <label htmlFor="date-filter">Date</label>
      <input
        id="date-filter"
        type="date"
        value={date}
        onChange={handleChange}
      />
    </div>
  );
}
