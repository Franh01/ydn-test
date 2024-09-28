"use client";

import React, { useEffect, useState } from "react";

import { IUser } from "../interfaces/User.interface";
import Link from "next/link";
import { UserService } from "../services/user.service";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);

  const loadInitialData = async () => {
    setUsers(await UserService.getAll());
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleDelete = async (id: number) => {
    await UserService.delete(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <h1>Usuarios</h1>

      <div className="buttons">
        <button
          className="secondary"
          onClick={() => router.push(`/users/create`)}
        >
          Crear usuario
        </button>
      </div>

      <ol>
        {users.map((user, index: number) => (
          <div key={user.id}>
            <li>
              <p>{index + 1 + ". " + user.name}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Link href={"users/" + user.id}>Ver detalle</Link>
                <button onClick={() => handleDelete(user.id)}>🗑️</button>
                <button
                  onClick={() => router.push("users/" + user.id + "/edit")}
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

export default Users;
