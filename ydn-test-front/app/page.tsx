import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <main>
        <h1>Prueba YDN de usarios y hobbies</h1>
        <div className="buttons">
          <Link href="/users" className="primary">
            Usuarios
          </Link>
          <Link href="/hobbies" className="secondary">
            Hobbies
          </Link>
        </div>
      </main>
    </div>
  );
}
