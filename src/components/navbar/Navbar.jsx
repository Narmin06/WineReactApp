import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/Logo.png";
import vector from "../../assets/images/Vector.png";
import { Search, ShoppingBasket,Heart } from "lucide-react";

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState(""); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []); 

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropDown = () => setDropDown(!dropDown);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser(null);
    setDropDown(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
     if (onSearch) onSearch(value);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="винная мельница" className="logo-img" />
          <span className="logo-text">Wine mill</span>
        </Link>

        <div className="navbar-center">
          <div className="search-box">
            <input type="text" placeholder="Search..." className="navbar-search"
              value={query}
              onChange={handleChange}
            />
            <button className="search-btn">
            <Search />
            </button>
          </div>
        </div>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="navbar-cart"> <ShoppingBasket className="cart-icon"/> Cart</Link>
              <Link to="/heart" className="navbar-heart"> <Heart className="heart-icon"/>Favourite</Link>
              <div className="avatar-container" onClick={toggleDropDown}>
                <div className="avatar">
                  <span className="avatar-letter">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                {dropDown && (
                  <div className="dropdown-menu">
                    <button onClick={handleLogout} className="dropdown-item">
                     Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="navbar-link">Login</Link>
              <Link to="/auth/register" className="navbar-link">Register</Link>
            </>
          )}

          <div className="burger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

    <nav className={`navbar-menu ${menuOpen ? "open" : ""}`}>
  <div className="mobile-search">
    <input type="text" placeholder="Search..."
     className="navbar-search" 
      value={query}       
      onChange={handleChange}
     />
    <button className="search-btn">
      <img src={vector} alt="Search" />
    </button>
  </div>

  <Link to="/wine">Wine</Link>
  <Link to="#">Whiskey</Link>
  <Link to="#">Cognac</Link>
  <Link to="#">Vodka</Link>
</nav>
    </header>
  );
}
