import React from 'react';
import '../styles/About.css'; // Archivo CSS para estilos

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">La Clasificación Arancelaria</h1>
            <p className="about-text">
                La clasificación arancelaria es esencial para el comercio internacional, ya que permite identificar y codificar mercancías de manera uniforme, facilitando el cálculo de impuestos y el cumplimiento de regulaciones aduaneras.
            </p>

            <h2 className="about-subtitle">Historia en Colombia</h2>
            <ul className="about-list">
                <li>
                    <strong>1959:</strong> Se adopta la Nomenclatura de Bruselas, un sistema internacional para la clasificación de mercancías.
                </li>
                <li>
                    <strong>1973:</strong> Mediante la Ley 8ª, Colombia aprueba el Acuerdo de Cartagena, integrándose a la Comunidad Andina y adoptando una nomenclatura arancelaria común.
                </li>
                <li>
                    <strong>2001:</strong> Se promulga el Decreto 2800, que modifica el arancel de aduanas y actualiza la nomenclatura arancelaria del país.
                </li>
            </ul>

            <h2 className="about-subtitle">Nuestra Aplicación</h2>
            <p className="about-text">
                Conscientes de la complejidad y constante actualización de las normativas arancelarias, hemos desarrollado una aplicación que facilita y agiliza la clasificación de mercancías en Colombia.
            </p>

            <h2 className="about-subtitle">Objetivo</h2>
            <p className="about-text">
                Nuestro objetivo es proporcionar una herramienta intuitiva que permita a empresas y particulares realizar una clasificación arancelaria precisa y rápida, asegurando el cumplimiento de las normativas vigentes y optimizando procesos comerciales.
            </p>

            <h2 className="about-subtitle">Beneficios</h2>
            <ul className="about-list">
                <li>
                    <strong>Eficiencia:</strong> Reduce el tiempo dedicado a la clasificación de productos.
                </li>
                <li>
                    <strong>Precisión:</strong> Minimiza errores en la determinación de códigos arancelarios.
                </li>
                <li>
                    <strong>Actualización:</strong> Mantiene información al día conforme a las últimas regulaciones.
                </li>
            </ul>

            <h2 className="about-subtitle">Compromiso</h2>
            <p className="about-text">
                Nos comprometemos a apoyar a nuestros usuarios en el entendimiento y aplicación de la clasificación arancelaria, contribuyendo al desarrollo del comercio exterior colombiano de manera eficiente y transparente.
            </p>
        </div>
    );
};

export default About;
