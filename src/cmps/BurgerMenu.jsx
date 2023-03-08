import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../services/user-service";

export function BurgerMenu({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate()

  const loggedInUser = userService.getLoggedInUser() || null
  function onLogOut(){
    userService.doLogout()
    navigate("/")
  }
  return (
    <div 
    className={`burger-menu flex ${isMenuOpen ? "open" : ""}`}
    // onClick={() => setIsMenuOpen(false)}
    >
      <NavLink to="/">Home</NavLink>
      {loggedInUser && loggedInUser.isAdmin && 
      <NavLink to="admin">Admin</NavLink>}
      {!loggedInUser && <NavLink to="login">Log In</NavLink>}
      {loggedInUser !== null && <button onClick={onLogOut}>Log Out</button>}
    </div>
  );
}
