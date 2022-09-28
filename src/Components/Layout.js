import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="layout-navbar">
        <ul>
            <img className="logo-image" src={(require('../Img/logo.png'))} alt=""></img>
          <li>
            <Link className="link" to="/">Map</Link>
          </li>
          <li>
            <Link className="link" to="/devices">Devices</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;