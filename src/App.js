// imports nécessaire au codage de ma page
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // CHARGEMENT DES DIFFERENT STATES
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  console.log("apikey", process.env.REACT_APP_API_KEY);
  // j'utilise le useEffect afin de charger les informations une seule fois et je rends dynamique la pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&per_page=100&page=${page}`
        );

        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page]);

  // creation d'un fonction pour controler l'affichage de la searchBar
  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  // creation de 2 fonctions pour controler l'affichage des pages
  const handlePage = () => {
    let nextPage = page + 1;
    console.log(nextPage);
    setPage(nextPage);
  };
  const handlePage2 = () => {
    let nextPage = page - 1;
    console.log(nextPage);
    setPage(nextPage);
  };

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div>
      <div className="flex justify-center  w-full mt-6">
        <input
          type="text"
          placeholder="What kind of picture are you looking for ?"
          className="flex justify-center w-96  border-2 border-slate-400 text-center	"
          onChange={handleSearchTerm}
        />
      </div>
      {page === 1 ? (
        <div className="justify-center flex mt-4">
          <button
            className="border-2 border-slate-400 text-center"
            onClick={handlePage}
          >
            Next page
          </button>
        </div>
      ) : page === 5 ? (
        <div className="justify-center flex mt-4 ">
          <button
            className="border-2 border-slate-400 text-center"
            onClick={handlePage2}
          >
            previous page
          </button>
        </div>
      ) : (
        <div className="justify-center flex mt-4">
          <button
            className="border-2 border-slate-400 text-center mr-2"
            onClick={handlePage2}
          >
            previous page
          </button>
          <button
            className="border-2 border-slate-400 text-center"
            onClick={handlePage}
          >
            Next page
          </button>
        </div>
      )}

      <div className="flex justify-center mt-5 gap-1.5 flex-wrap">
        {data.hits
          .filter((element) => {
            return element.tags
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((element, index) => {
            return (
              <div
                key={index}
                className="flex mr-2.5 w-72 h-72 justify-center "
              >
                <img
                  src={element.largeImageURL}
                  alt=""
                  className="object-cover h-full w-full  "
                  object-cover
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
