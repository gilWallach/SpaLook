export function Screen({ isMenuOpen, setIsMenuOpen, isSortByDropdown = false }) {
  return (
    <div
      className={`screen main-layout full ${isMenuOpen ? "open" : ""} ${isSortByDropdown ? "sortBy-screen" : ""}`}
      onClick={() => setIsMenuOpen()}
    ></div>
  );
}
