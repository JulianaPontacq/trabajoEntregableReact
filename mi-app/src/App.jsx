import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]); // estado para guardar los usuarios
  const [busqueda, setBusqueda] = useState(""); // estado para el filtro de búsqueda

  // useEffect para cargar los datos desde la API al iniciar el componente
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }, []);

  // Función para eliminar un usuario de la lista localmente
  const eliminarUsuario = (id) => {
    const nuevaLista = usuarios.filter((usuario) => usuario.id !== id);
    setUsuarios(nuevaLista);
  };

  // Filtrar usuarios por nombre 
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <h1>Lista de Usuarios</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.name}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
