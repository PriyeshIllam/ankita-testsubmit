import { Event } from "../../utils/types"; 

interface EventCardProps {
  event: Event;
  onBookClick?: () => void;
}

export default function EventCard({ event, onBookClick }: EventCardProps) {
  return (
    <div className="event-card border p-4 rounded shadow">
      <h2>{event.name}</h2>
      <p>
        {event.date} - {event.location}
      </p>
      <p>{event.description}</p>
      <p>Seats: {event.seats}</p>
      <p>Price: ${event.price}</p>
      <button type="button" onClick={onBookClick}>
        Book Now
      </button>
    </div>
  );
}
