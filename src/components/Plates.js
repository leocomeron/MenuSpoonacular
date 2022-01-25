import { Fragment, useEffect, useState } from "react";
import Plate from "./Plate";

const axios = require("axios").default;

const Plates = () => {
  const [platesData, setPlatesData] = useState([]);
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const axiosData = async () => {
      await axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=66359dec162048b59df996874365a174`,
          {
            headers: { Authorization: authToken },
          }
        )
        .then(function (response) {
          setPlatesData(response.data.results);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    };
    axiosData();
  }, []);

  return (
    <Fragment>
      {platesData.map((plate) => {
        return <Plate key={plate.id} title={plate.title} image={plate.image} />;
      })}
    </Fragment>
  );
};

export default Plates;
