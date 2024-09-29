"use client";

import React, { useEffect, useState } from "react";

import { IUser } from "@/app/interfaces/User.interface";
import { UserService } from "@/app/services/user.service";
import { useRouter } from "next/navigation";

const UserDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [userData, setUserData] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState<boolean>(true);

  const loadInitialData = async () => {
    setUserData(await UserService.getById(+id));
    setLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []); //eslint-disable-line

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h1>Detalles de usuario</h1>

      <ul>
        <li>
          <b>ID: &nbsp;</b>
          {userData?.id}
        </li>
        <li>
          <b>Nombre: &nbsp;</b>
          {userData?.name}
        </li>
        <li>
          <b>Hobbies: &nbsp;</b>
          {userData.hobbies.length > 0
            ? userData.hobbies.map((hobby) => hobby.name).join(", ")
            : "Sin hobbies"}
        </li>
      </ul>
      <div className="buttons">
        <button
          className="secondary"
          onClick={() => router.push(`/users/${id}/edit`)}
        >
          Editar
        </button>
      </div>
    </>
  );
};

export default UserDetail;
