import React, { useEffect, useState } from "react";

type IframeProps = {
  src: string;
  width?: string;
  title?: string;
};

const Iframe: React.FC<IframeProps> = ({ src, width = "100%", title = "iframe" }) => {
  const [height, setHeight] = useState("900px");

  useEffect(() => {
    // Función para actualizar la altura según el tamaño de la pantalla
    const updateHeight = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setHeight("900px");
      } else {
        setHeight("1800px");
      }
    };


    // Ejecutar la función al cargar la página y al cambiar el tamaño de la pantalla
    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <iframe
      src={src}
      width={width}
      height={height}
      title={title}
      style={{ border: "none" }}
    />
  );
};

export default Iframe;
