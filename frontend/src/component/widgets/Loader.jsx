import React from "react";
import Loading from "../../assets/images/loading.svg";
import "./loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <img src={Loading} alt="Loader" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
