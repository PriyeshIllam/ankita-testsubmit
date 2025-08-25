'use client';

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import DateFilter from "../components/DateFilter";
import { Event } from "../utils/types";
import styles from "../components/EventCard/EventCard.module.css"; // <-- Import the CSS module

const events: Event[] = [
  {
    id: "1",
    name: "React Conference",
    date: "2025-09-01",
    location: "New York",
    description: "A conference about React and frontend development.",
    seats: 120,
    price: 99,
    title: ""
  },
  {
    id: "2",
    name: "Vue Summit",
    date: "2025-10-15",
    location: "San Francisco",
    description: "Learn everything about Vue.js and ecosystem.",
    seats: 80,
    price: 79,
    title: ""
  },
  {
    id: "3",
    name: "Angular Connect",
    date: "2025-11-05",
    location: "London",
    description: "Angular developers unite for talks and workshops.",
    seats: 150,
    price: 120,
    title: ""
  },
  {
    id: "4",
    name: "Next.js Live",
    date: "2025-12-01",
    location: "Berlin",
    description: "Explore the latest in Next.js and React ecosystem.",
    seats: 200,
    price: 150,
    title: ""
  }
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleBookClick = (eventName: string) => {
    alert(`You booked: ${eventName}`);
  };

  // Filter events based on date and search term
  const filteredEvents = events.filter((event) => {
    const matchesDate = selectedDate ? event.date === selectedDate : true;
    const matchesSearch = searchTerm
      ? event.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesDate && matchesSearch;
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Upcoming Events</h1>

      {/* Search Bar */}
      <SearchBar onSearch={(term) => setSearchTerm(term)} />

      {/* Date Filter */}
      <DateFilter onChange={(date) => setSelectedDate(date)} />

      {/* No events fallback */}
      {filteredEvents.length === 0 && (
        <p>
          No events found for {selectedDate || searchTerm ? `${selectedDate || searchTerm}` : ""}
        </p>
      )}

      {/* Events Grid using the CSS module */}
      <div className={styles.cardsContainer}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onBookClick={() => handleBookClick(event.name)}
          />
        ))}
      </div>
    </div>
  );
}
