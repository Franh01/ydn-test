import React from "react";

const DefaultErrorHandler = ({ error }: { error: string }) => {
  return (
    <>
      <h1>{error}</h1>
      <h2>Parece que ocurrio un error, utiliza el botón para regresar</h2>
    </>
  );
};

export default DefaultErrorHandler;
