import { Event } from "../../utils/types";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: Event;
  onBookClick?: () => void;
}

export default function EventCard({ event, onBookClick }: EventCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{event.name}</h2>
      <p className={styles.dateLocation}>
        {event.date} – {event.location}
      </p>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.seats}>Seats: {event.seats}</p>
      <p className={styles.price}>Price: ${event.price}</p>
      <button className={styles.button} type="button" onClick={onBookClick}>
        Book Now
      </button>
    </div>
  );
}

