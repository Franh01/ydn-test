"use client";

import React, { useEffect, useState } from "react";

import { HobbyService } from "@/app/services/hobby.service";
import { IHobby } from "@/app/interfaces/Hobby.interface";
import { UserService } from "../../services/user.service";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();

  const [hobbies, setHobbies] = useState<IHobby[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [selectedHobbies, setSelectedHobbies] = useState<IHobby[]>([]);
  const [selectedHobbyId, setSelectedHobbyId] = useState<number | "">("");

  const loadInitialData = async () => {
    setHobbies(await HobbyService.getAll());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleHobbySelect = () => {
    const selectedHobby = hobbies.find((h) => h.id === Number(selectedHobbyId));
    if (selectedHobby) {
      setSelectedHobbies([...selectedHobbies, selectedHobby]);
      setHobbies(hobbies.filter((h) => h.id !== selectedHobby.id));
      setSelectedHobbyId("");
    }
  };

  const handleHobbyRemove = (hobbyId: number) => {
    const hobbyToRemove = selectedHobbies.find((h) => h.id === hobbyId);
    if (hobbyToRemove) {
      setSelectedHobbies(selectedHobbies.filter((h) => h.id !== hobbyId));
      setHobbies([...hobbies, hobbyToRemove]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // validations
    if (userName === "") {
      alert("Ingresa un nombre");
      return;
    }

    await UserService.create(userName, selectedHobbies);
    router.back();
  };

  return (
    <>
      <h1>Crear usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Ingresa un nombre"
          />
        </div>

        <div className="form-element">
          <label htmlFor="hobby">Hobbies:</label>
          <select
            name="hobbies"
            id="hobbies"
            value={selectedHobbyId} // Usar el estado para el valor del select
            onChange={(e) => setSelectedHobbyId(Number(e.target.value))}
            onBlur={handleHobbySelect} // Agregar manejo del blur para seleccionar
          >
            <option value="" disabled>
              Selecciona un hobby
            </option>
            {hobbies.map((hobby) => (
              <option key={hobby.id} value={hobby.id}>
                {hobby.name}
              </option>
            ))}
          </select>
          <button
            className="hobby-button"
            type="button"
            onClick={handleHobbySelect}
            disabled={selectedHobbyId === ""}
          >
            Añadir
          </button>
        </div>

        <div>
          <h3>Hobbies Seleccionados:</h3>
          {selectedHobbies.length === 0 && <p>No hay hobbies seleccionados</p>}
          <ol>
            {selectedHobbies.map((hobby) => (
              <>
                <li key={hobby.id}>
                  {hobby.name}
                  <button
                    className="hobby-button"
                    type="button"
                    onClick={() => handleHobbyRemove(hobby.id)}
                  >
                    Eliminar
                  </button>
                </li>
                <div className="divider"></div>
              </>
            ))}
          </ol>
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
