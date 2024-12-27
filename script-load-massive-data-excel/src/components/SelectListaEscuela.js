"use client";

import { useState, useEffect } from "react";

export default function SelectListaEscuela({ setSelectedEscuela }) {
  const [escuelas, setEscuelas] = useState([]);
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // Estado local para el valor seleccionado

  useEffect(() => {
    const fetchEscuelas = async () => {
      try {
        const response = await fetch("/api/escuelas");
        const data = await response.json();
        setEscuelas(data);
        setFilteredEscuelas(data);
      } catch (error) {
        console.error("Error al cargar las escuelas:", error);
      }
    };

    fetchEscuelas();
  }, []);

  useEffect(() => {
    const results = escuelas.filter((escuela) =>
      `${escuela.esc_nombre} ${escuela.esc_facultad}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredEscuelas(results);
  }, [searchTerm, escuelas]);

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    setSelectedEscuela(value); // Actualizar el estado principal en `page.js`
  };

  return (
    <div className="w-full max-w-md mx-auto mb-10">
      <label className="block text-sm font-medium text-gray-100 mb-2">
        Seleccione una escuela:
      </label>

      <input
        type="text"
        placeholder="Buscar escuela..."
        className="block w-full px-3 py-2 mb-2 bg-slate-700 text-gray-200 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="block w-full px-3 py-2 bg-slate-800 text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedValue}
        onChange={handleSelectionChange}
      >
        <option value="">Seleccionar escuela</option>
        {filteredEscuelas.map((escuela) => (
          <option key={escuela.id_escuela} value={escuela.id_escuela}>
            {escuela.esc_nombre} - {escuela.esc_facultad}
          </option>
        ))}
      </select>
    </div>
  );
}
