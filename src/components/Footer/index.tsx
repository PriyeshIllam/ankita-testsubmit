import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      © {year} Evently. All rights reserved.
    </footer>
  );
}
