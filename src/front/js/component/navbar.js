import React, { useContext } from "react";
import "../../styles/home.css";
import StarWarsLogo from "../../img/Star_Wars_Logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <img src={StarWarsLogo} className="img"></img>
        </span>
        <div className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle
              className="dropdownNavbar btns"
              variant="success"
              id="dropdown-basic"
            >
              Favorites
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {store.favorites.map((favorite, index) => {
                return (
                  <Dropdown.Item
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="ms-2 me-3">{favorite.name}</div>
                    <div onClick={() => actions.manageFavorites(favorite.name)}>
                      <i className="far fa-trash-alt deleteButton "></i>
                    </div>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
