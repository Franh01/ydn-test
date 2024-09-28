"use client";

import React, { useEffect, useState } from "react";

import { HobbyService } from "@/app/services/hobby.service";
import { IHobby } from "@/app/interfaces/Hobby.interface";
import { useRouter } from "next/navigation";

const HobbyDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [hobbyData, setHobbyData] = useState<IHobby>({} as IHobby);
  const [loading, setLoading] = useState<boolean>(true);

  const loadInitialData = async () => {
    setHobbyData(await HobbyService.getById(+id));
    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h1>Detalles de hobby</h1>

      <ul>
        <li>
          <b>ID: &nbsp;</b>
          {hobbyData?.id}
        </li>
        <li>
          <b>Nombre: &nbsp;</b>
          {hobbyData?.name}
        </li>
      </ul>
      <div className="buttons">
        <button
          className="secondary"
          onClick={() => router.push(`/hobbies/${id}/edit`)}
        >
          Editar
        </button>
      </div>
    </>
  );
};

export default HobbyDetail;
