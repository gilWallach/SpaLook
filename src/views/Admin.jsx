import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSpas } from "../store/actions/spa.actions";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { loadLabels } from "../store/actions/label.actions";
import { SpaListSkeleton } from "../cmps/SpaListSkeleton";
import { utilService } from "../services/util.service";

export function Admin() {
  const dispatch = useDispatch();
  const spas = useSelector((state) => state.spaModule.spas);
  const labels = useSelector((state) => state.categoryModule.labels);

const navigate = useNavigate()
  useEffect(() => {
    preventNonAdmin()
    dispatch(loadSpas());
    dispatch(loadLabels());
  }, []);

  function preventNonAdmin() {
    var loggedInUser = utilService.loadFromStorage('loggedInUser')
    if(!loggedInUser || !loggedInUser.isAdmin) navigate("/signin")
  }

  if (!spas) return Array.from(new Array(4)).map((i,idx) => <div key={`skeleton_${idx}`}><SpaListSkeleton /></div>);

  return (
    // add condition for user authentication
    <section className="admin full main-layout">
          <nav className="admin-nav full">
            <ul className="clean-list flex">
              <li className=" full-grow">
                <NavLink to={"/admin"} end>
                  Spas
                </NavLink>
              </li>
              <li className=" full-grow">
                <NavLink to={"/admin/label"}>Labels</NavLink>
              </li>
            </ul>
          </nav>
          <Outlet context={[spas, labels]}></Outlet>
    </section>
  );
}
