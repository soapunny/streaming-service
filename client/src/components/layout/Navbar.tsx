// client/src/components/layout/Navbar.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchInput(keyword);

    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      navigate("/search", { replace: true });
      return;
    }
    navigate(`/search/${encodeURIComponent(trimmedKeyword)}`, {
      replace: true,
    });
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
          value={searchInput} // Controlled Component: value is from state, onChange updates the state
          onChange={(e) => handleSearch(e)}
        />
        <span
          className="navbar__wishlist"
          onClick={() => navigate("/wishlist")}
          // () => navigate("/wishlist"): function, which do not trigger the navigate right away
          // onClick{navigate("/wishlist")}: navigate right away when component renders, which is not what we want
        >
          ♡
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
