import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>Evently (Event Booking)</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/bookings">Bookings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
