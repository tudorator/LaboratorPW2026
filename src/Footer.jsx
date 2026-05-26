function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>© {currentYear} Grecu Tudor-Mihai — React + Express + MongoDB</p>
    </footer>
  );
}

export default Footer;
