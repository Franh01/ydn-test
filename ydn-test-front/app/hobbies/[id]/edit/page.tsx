"use client";

import React, { useEffect, useState } from "react";

import { HobbyService } from "@/app/services/hobby.service";
import { useRouter } from "next/navigation";

const Edit = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const router = useRouter();

  const [hobbyName, setHobbyName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const loadInitialData = async () => {
    const hobbyData = await HobbyService.getById(+id);

    setHobbyName(hobbyData.name);

    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validations
    if (hobbyName === "") {
      alert("El nombre no puede estar vacío");
      return;
    }

    await HobbyService.update(parseInt(id), hobbyName);
    router.back();
  };

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h1>Editando usuario con ID: {id}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setHobbyName(e.target.value)}
            value={hobbyName}
            placeholder="Ingresa un nombre"
          />
        </div>

        <div className="buttons">
          <button type="submit" className="secondary">
            Actualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
