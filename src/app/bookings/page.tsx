"use client";
import { useState } from "react";
import BookingForm from "@/components/BookingForm";
import { Event } from "@/utils/types";

export default function BookingsPage() {
  // For demo: static event data (in real case, fetch by query or params)
  const event: Event = {
    id: "1",
    name: "React Conference",
    date: "2025-09-01",
    location: "Stockholm",
    description: "A React event",
    seats: 5,
    price: 100,
    title: ""
  };

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleConfirm = (data: { eventId: string; name: string; email: string; quantity: number }) => {
    console.log("Booking confirmed:", data);
    setBookingConfirmed(true);
  };

  const handleCancel = () => {
    console.log("Booking canceled");
  };

  return (
    <div>
      <h1>Book Your Event</h1>
      {!bookingConfirmed ? (
        <BookingForm event={event} onCancel={handleCancel} onConfirm={handleConfirm} />
      ) : (
        <p>Thank you! Your booking is confirmed.</p>
      )}
    </div>
  );
}
