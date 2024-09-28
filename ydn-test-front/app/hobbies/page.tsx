"use client";

import React, { useEffect, useState } from "react";

import { HobbyService } from "../services/hobby.service";
import { IHobby } from "../interfaces/Hobby.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hobbies = () => {
  const router = useRouter();

  const [hobbies, setHobbies] = useState<IHobby[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadInitialData = async () => {
    setHobbies(await HobbyService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleDelete = async (id: number) => {
    await HobbyService.delete(id);
    setHobbies(hobbies.filter((hobby) => hobby.id !== id));
  };

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h1>Hobbies</h1>

      <div className="buttons">
        <button
          className="secondary"
          onClick={() => router.push(`/hobbies/create`)}
        >
          Crear hobby
        </button>
      </div>
      {hobbies.length === 0 && <p>No hay hobbies</p>}
      <ol>
        {hobbies.map((hobby, index: number) => (
          <div key={hobby.id}>
            <li>
              <p>{index + 1 + ". " + hobby.name}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Link href={"hobbies/" + hobby.id}>Ver detalle</Link>
                <button onClick={() => handleDelete(hobby.id)}>🗑️</button>
                <button
                  onClick={() => router.push("hobbies/" + hobby.id + "/edit")}
                >
                  ✏️
                </button>
              </div>
            </li>
            <div className="divider" />
          </div>
        ))}
      </ol>
    </>
  );
};

export default Hobbies;
