// components/Footer/index.tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      © {year} Evently. All rights reserved.
    </footer>
  );
}
