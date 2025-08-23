'use client'
import { useState } from "react";
import SearchBar from "../components/SearchBar"; 

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  
  return (
    <div >
      <SearchBar />
      hi
    </div>
  );
}

