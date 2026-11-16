import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scriptBundle = document.createElement('script');
    scriptBundle.src = "https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js";
    scriptBundle.async = true;
    
    scriptBundle.onload = () => {
      if (window.tsParticles) {
        window.tsParticles.load("tsparticles", {
          fullScreen: { enable: true },
          fpsLimit: 60,
          particles: {
            groups: {
              z5000: { number: { value: 70 }, zIndex: { value: 5000 } },
              z7500: { number: { value: 30 }, zIndex: { value: 75 } },
              z2500: { number: { value: 50 }, zIndex: { value: 25 } },
              z1000: { number: { value: 40 }, zIndex: { value: 10 } },
            },
            number: { value: 200, density: { enable: false } },
            color: { value: "#fff" },
            shape: { type: "circle" },
            opacity: { value: 1 },
            size: { value: 3 },
            move: {
              enable: true,
              speed: 5,
              direction: "right",
              straight: true,
              outModes: { default: "out" },
            },
            zIndex: { value: 5, opacityRate: 0.5 },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              push: { quantity: 4, groups: ["z5000", "z7500", "z2500", "z1000"] },
            },
          },
          detectRetina: true,
          background: { color: "#000000" },
          emitters: {
            position: { y: 55, x: -30 },
            rate: { delay: 7, quantity: 1 },
            size: { width: 0, height: 0 },
            particles: {
              shape: {
                type: "images",
                options: {
                  images: [
                    { src: "https://particles.js.org/images/amongus_blue.png", width: 205, height: 267 },
                    { src: "https://particles.js.org/images/amongus_cyan.png", width: 207, height: 265 },
                    { src: "https://particles.js.org/images/amongus_green.png", width: 204, height: 266 },
                    { src: "https://particles.js.org/images/amongus_lime.png", width: 206, height: 267 },
                    { src: "https://particles.js.org/images/amongus_orange.png", width: 205, height: 265 },
                    { src: "https://particles.js.org/images/amongus_pink.png", width: 205, height: 265 },
                    { src: "https://particles.js.org/images/amongus_red.png", width: 204, height: 267 },
                    { src: "https://particles.js.org/images/amongus_white.png", width: 205, height: 267 },
                  ],
                },
              },
              size: { value: 40 },
              move: { speed: 10, outModes: { default: "destroy", left: "none" }, straight: true },
              rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 10, sync: true } },
            },
          },
        });
      }
    };

    document.body.appendChild(scriptBundle);

    return () => {
      if (scriptBundle.parentNode) {
        scriptBundle.parentNode.removeChild(scriptBundle);
      }
    };
  }, []);

  return (
    <div className="not-found-container">
      <div id="tsparticles"></div>
      <section className="text">
        <h1>404</h1>
        <h2>Tal vez estás perdido o eres un impostor 👻</h2>
        {/* Botón de regreso */}
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver atrás
        </button>
      </section>
    </div>
  );
};

export default NotFound;