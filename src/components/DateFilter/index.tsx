import { useState } from "react";
import styles from "./DateFilter.module.css";

interface DateFilterProps {
  onChange?: (date: string) => void;
}

export default function DateFilter({ onChange }: DateFilterProps) {
  const [date, setDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    onChange?.(selectedDate);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="date-filter" className={styles.label}>Date:</label>
      <input
        id="date-filter"
        type="date"
        value={date}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
}
