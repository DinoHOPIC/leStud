// imports nécessaire au codage de ma page
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // CHARGEMENT DES DIFFERENT STATES
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // j'utilise le useEffect afin de chargé les informations une seule fois
  useEffect(() => {
    // Je n'ai pas reussi à masquer l'API_KEY avec dotenv ... :(
    // console.log(process.env.REACT_APP_API_KEY);
    // connection du front à l'API en utilisant la route donnée dans la doc de l'API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640"
        );

        console.log(response.data);
        // je  set les data obtenu de mon state afin de pourvoir les réutiliser plus tard dans mon map
        setData(response.data);
        // je passe le state isLoading à false afin d'entré dans ma condition pour afficher les résultat de mon map
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // je créé une fonction afin de mémoriser le contenu de la search bar et que j'utiliserais dans le onChange de mon input
  const handleSearchTerm = (e) => {
    // je créé une variable dans laquelle je stock la valeur de que je rentre dans ma search bar
    let value = e.target.value;
    // je me mémorise cette valeur dans mon state
    setSearchTerm(value);
  };

  //
  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div>
      <div className="flex justify-center  w-full mt-6">
        {/* CREATION DE MA BARRE DE RECHERCHE */}
        <input
          type="text"
          // onChange={(event) => searchResult(event)}
          placeholder="What kind of picture are you looking for ?"
          className="flex justify-center w-96  border-2 border-slate-400 text-center	"
          // j'utilise la fonction handleSearchTerm que j'ai précédement crée
          onChange={handleSearchTerm}
        />
      </div>

      <div className="flex justify-center mt-5 gap-1.5 flex-wrap">
        {/* je vais faire un 1er filtre au niveau des tags des photos , avec filter() et je vais mettre tout en minuscule pour etre sur que les resultats correspondent */}
        {data.hits
          .filter((element) => {
            return element.tags
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((element, index) => {
            /* A parti d'ici je map sur les tous le tableau hits afin d'obtenir toutes les images issues du fitlre avec les tags*/
            return (
              // je retourne un div qui contient une image avec le chemin de l'image comme source de la balise img
              <div
                key={index}
                className="flex mr-2.5 w-72 h-72 justify-center "
              >
                <img
                  src={element.largeImageURL}
                  alt=""
                  className="object-cover h-full w-full "
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
