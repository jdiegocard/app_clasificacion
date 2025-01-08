import React from 'react';
import homeImage from '../assets/home.jpg'; // imagen home
import '../styles/Home.css'; // Archivo CSS para estilos

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">La Importancia de la Clasificación Arancelaria en Colombia</h1>
      <img src={homeImage} alt="Clasificación Arancelaria" className="home-image" />
      <p className="home-text">
        La clasificación arancelaria es clave para garantizar un comercio exterior eficiente y transparente. 
        En Colombia, este sistema organiza los productos según normas internacionales, facilitando el cálculo 
        de impuestos, regulaciones y acuerdos comerciales. Una correcta clasificación evita sanciones, reduce 
        costos y fomenta la competitividad empresarial. ¡Clasificar correctamente es construir un comercio justo 
        y sostenible!
      </p>
    </div>
  );
};

export default Home;
