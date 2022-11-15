import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardInfo from "../component/Card.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getPeople();
    actions.getPlanets();
  }, []);

  return (
    <div>
      <h1 className="title">Characters</h1>
      <div className="row x-scroll">
        {store.people.map((person, index) => {
          return (
            <CardInfo
              className="card"
              key={person.name}
              detail={person}
              type="people"
              id={index + 1}
            />
          );
        })}
      </div>
      <h1 className="title">Planets</h1>
      <div className="row x-scroll ">
        {store.planets.map((planet, index) => {
          return (
            <CardInfo
              className="card"
              key={planet.name}
              detail={planet}
              type="planets"
              id={index + 1}
            />
          );
        })}
      </div>
      {store.favorites.map((favorite) => {
        return <h1 key={favorite.name}>{favorite.name}</h1>;
      })}
    </div>
  );
};
