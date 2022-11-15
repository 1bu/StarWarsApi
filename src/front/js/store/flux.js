const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      people: [],
      planets: [],
      favorites: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      getPeople: async () => {
        let response = await fetch("https://swapi.dev/api/people");
        let data = await response.json();
        setStore({ people: data.results });
      },

      getPlanets: async () => {
        let response = await fetch("https://swapi.dev/api/planets");
        let data = await response.json();
        setStore({ planets: data.results });
      },

      isIn: (favorites, name) => {
        let isIn = false;
        for (let favorite of favorites) {
          if (favorite.name === name) {
            isIn = true;
          }
        }
        return isIn;
      },

      manageFavorites: (name) => {
        const store = getStore();
        let oldFavorites = [...store.favorites];
        let isIn = getActions().isIn(oldFavorites, name);
        let newFavorites;
        if (isIn) {
          newFavorites = oldFavorites.filter(
            (favorite) => favorite.name !== name
          );
        } else {
          newFavorites = [...store.favorites, { name: name }];
        }
        setStore({
          favorites: newFavorites,
        });
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setStore({
          favorites: newFavorites,
        });
      },
    },
  };
};

export default getState;
