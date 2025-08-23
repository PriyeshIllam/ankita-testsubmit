export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  seats: number;
  price: number;
  title: string; // optional field, kept as string for compatibility
}
