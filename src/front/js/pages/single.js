import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const { details, setDetails } = useState({});
  const { type, theid } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      let response = await fetch(`https://swapi.dev/api/${type}/${theid}/`);
      let data = await response.json();
      setDetails(data);
    };
    getDetails();
  }, []);

  return (
    <div className="jumbotron">
      {/*<h1>{details.name}</h1>*/}
      <Link to="/">
        <span className="btn btn-primary btn-lg btns" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
