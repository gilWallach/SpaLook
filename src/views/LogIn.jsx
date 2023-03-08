import { useState } from "react";
import { useNavigate } from "react-router";
import { userService } from "../services/user-service";

export function LogIn() {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useState()
  async function onSubmitLogin(ev) {
    ev.preventDefault()
    await userService.createUsers();
    const currUser = {
      username: ev.target[0].value,
      password: ev.target[1].value,
    }
    const loggedInUser = userService.doLogin(currUser.username, currUser.password)
    if(loggedInUser && loggedInUser.isAdmin) navigate("/admin")
    else if(loggedInUser && !loggedInUser.isAdmin) navigate("/")
    else(setIsAuthenticated(false))
  }

  return (
    <section className="sec-top-margin sign-in flex column align-center">
      <h1>Hello guest!</h1>
      <h3>Please login to manage spas</h3>
      <form onSubmit={(ev) => onSubmitLogin(ev)}>
        <label>
          <p>Username</p>
          <input type="text" required/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" required/>
        </label>
        <div className="submit-btn-container">
          <button className="simple-button" type="submit">Submit</button>
        </div>
      </form>
      {isAuthenticated === false && <p>Username or password invalid</p>}
    </section>
  );
}
