import { useState } from "react";

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

  const handleSubmit = () => {
    if (!name || !email || !quantity) {
      setError("Please fill all fields");
      return;
    }
    const qty = Number(quantity);
    if (qty > event.seats) {
      setError(`Only ${event.seats} seats available`);
      return;
    }
    setError("");
    onConfirm({ eventId: event.id, name, email, quantity: qty });
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          aria-label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          aria-label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          aria-label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" onClick={handleSubmit}>
        Confirm booking
      </button>
    </div>
  );
}
