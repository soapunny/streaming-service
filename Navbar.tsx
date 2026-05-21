// client/src/components/layout/Navbar.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keyword = e.target.value;
    setSearchInput(keyword);
    navigate(`/search/${keyword}`);
  };

  return (
    <nav className="navbar">
      <span className="navbar__logo" onClick={() => navigate("/")}>
        REEL
      </span>
      <div className="navbar__actions">
        <input
          type="text"
          className="navbar__search"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => handleSearch(e)}
        />
        <span
          className="navbar__wishlist"
          onClick={() => navigate("/wishlist")}
        >
          ♡
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
