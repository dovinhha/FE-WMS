/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState, useRef } from "react";
// react library for routing
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes, { routeAdmin } from "routes.js";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "Redux/Actions";
import queryString from "query-string";

function Admin() {
  const { currentAccount } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const { tab } = useParams();
  const history = useHistory();
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const location = useLocation();
  const mainContentRef = useRef(null);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (
      mainContentRef.current !== null &&
      mainContentRef.current !== undefined
    ) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-hidden");
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-show");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-show");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf("/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  useEffect(() => {
    // dispatch(
    //   accountActions.getCurrentAccount(
    //     localStorage.getItem("id"),
    //     queryString.stringify({ populate: "roleId" })
    //   )
    // );
  }, []);
  useEffect(() => {
    // if (
    //   !!currentAccount &&
    //   currentAccount.isPasswordChange === false &&
    //   tab !== "change-password"
    // ) {
    //   history.push(`/account-info/${localStorage.getItem("id")}/1`);
    // }
  }, [window.location.href, currentAccount]);
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "" ||
    !localStorage.getItem("expiresAt") ||
    localStorage.getItem("expiresAt") === "" ||
    !localStorage.getItem("refreshToken") ||
    localStorage.getItem("refreshToken") === ""
    // ||
    // !localStorage.getItem("id") ||
    // localStorage.getItem("id") === ""
  ) {
    return <Redirect to="/auth/login" />;
  }

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/fovina-logo.png").default,
          imgAlt: "Fovina Logo",
        }}
        routeAdmin={routeAdmin}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          {getRoutes(routeAdmin)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
        <AdminFooter />
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
}

export default Admin;
