"use client";

import React, { useState } from "react";

import { HobbyService } from "@/app/services/hobby.service";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();

  const [hobbyName, setHobbyName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validations
    if (hobbyName === "") {
      alert("Ingresa un nombre");
      return;
    }

    await HobbyService.create(hobbyName);
    router.back();
  };

  return (
    <>
      <h1>Crear hobby</h1>
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
            Crear
          </button>
        </div>
      </form>
    </>
  );
};

export default Users;
