import { useState } from "react";
import styles from "./BookingForm.module.css";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  seats: number;
  price: number;
  title: string;
}

interface BookingFormProps {
  event: Event;
  onCancel: () => void;
  onConfirm: (data: { eventId: string; name: string; email: string; quantity: number }) => void;
}

export default function BookingForm({ event, onCancel, onConfirm }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !quantity) {
      setError("Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    const qty = Number(quantity);
    if (qty < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (qty > event.seats) {
      setError(`Only ${event.seats} seats available`);
      return;
    }

    setError("");
    onConfirm({ eventId: event.id, name, email, quantity: qty });
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          id="name"
          aria-label="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          aria-label="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="quantity" className={styles.label}>Quantity</label>
        <input
          id="quantity"
          type="number"
          aria-label="Quantity"
          className={styles.input}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.buttonGroup}>
        <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className={`${styles.button} ${styles.confirmButton}`} onClick={handleSubmit}>
          Confirm booking
        </button>
      </div>
    </div>
  );
}
