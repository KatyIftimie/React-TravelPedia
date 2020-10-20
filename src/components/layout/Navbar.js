import React, { useState, useEffect } from "react";

import logo2 from "../../img/logo2.png";

export default function NavbarLayout() {
  const [userIsLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("userEmail")) {
      setIsLogin(true);
      setFirstName(window.sessionStorage.getItem("firstName"));
      setUserType(window.sessionStorage.getItem("userType"));
    }
  }, []);

  return (
    <header className="main_menu home_menu">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href="/">
                {" "}
                <img src={logo2} alt="logo" style={logoStyle} />{" "}
              </a>

              <div
                className="collapse navbar-collapse main-menu-item"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="/">
                      Home<span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/worldMap">
                      Properties
                    </a>
                  </li>
                  {userIsLogin ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/logout">
                        Logout
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link" href="/login">
                        Login
                      </a>
                    </li>
                  )}
                  {userIsLogin ? (
                    <li className="nav-item">
                      <a
                        href="/me"
                        className="nav-link"
                        style={{
                          color: " #d46e1a",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        Welcome {firstName}
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a
                        href="/register"
                        className="nav-link"
                        style={{
                          color: " #d46e1a",
                          fontWeight: "bold",
                        }}
                      >
                        Register
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {userIsLogin && userType === "ROLE_HOST" ? (
                <div className="btn_1 d-none d-lg-block">
                  <a className="float-right" href="/add-rental">
                    {" "}
                    Submit Property
                  </a>
                </div>
              ) : userIsLogin && userType === "ROLE_GUEST" ? (
                <div className="btn_1 d-none d-lg-block">
                  <a className="float-right" href="/bookings">
                    {" "}
                    My Bookings
                  </a>
                </div>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
const logoStyle = {
  width: "90%",
  height: "70%",
};
