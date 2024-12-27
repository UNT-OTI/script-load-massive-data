"use client";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";

const ExcelDropZone = ({ selectedEscuela }) => {
  const [file, setFile] = useState(null); // Archivo cargado
  const [message, setMessage] = useState(""); // Mensaje de éxito o error
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const fileInputRef = useRef(null); // Referencia al input de tipo file

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      setMessage(""); // Limpiar mensajes previos
    } else {
      alert("Por favor, carga un archivo Excel válido.");
    }
  };

  const handleProcessAndUpload = async () => {
    if (!file) {
      alert("Por favor, carga un archivo antes de continuar.");
      return;
    }

    if (!selectedEscuela) {
      alert("Por favor, selecciona una escuela.");
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          // Subir los datos procesados al backend
          const response = await fetch("/api/estudiantes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              estudiantes: json,
              est_escuela: selectedEscuela,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            setMessage("Datos subidos correctamente.");
            setFile(null); // Limpiar el archivo cargado
          } else {
            setMessage(`Error: ${result.error}`);
          }
        } catch (error) {
          console.error("Error al procesar el archivo:", error);
          setMessage("Error al procesar el archivo.");
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error durante el procesamiento o subida:", error);
      setMessage("Error durante el procesamiento o subida.");
      setIsLoading(false);
    }
  };

  const handleClickDropZone = () => {
    fileInputRef.current.click(); // Simula un clic en el input file
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-teal-600 to-indigo-900">
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onClick={handleClickDropZone}
        className="w-96 h-48 border-2 mt-10 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white shadow-md cursor-pointer"
      >
        <p className="text-gray-500 text-center">
          {file
            ? `Archivo cargado: ${file.name}`
            : "Haz clic o arrastra y suelta tu archivo Excel aquí"}
        </p>
      </div>

      {/* Campo de archivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".xlsx"
        onChange={handleFileChange}
      />

      <button
        onClick={handleProcessAndUpload}
        className={`mt-4 px-4 py-2 rounded-md ${
          isLoading
            ? "bg-gray-400 text-gray-800 cursor-not-allowed"
            : "mt-4 px-4 py-2 bg-gradient-to-r from-teal-200 to-teal-500 rounded-md text-slate-600"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : "Procesar y Subir Archivo"}
      </button>

      {message && <p className="mt-4 text-gray-200">{message}</p>}
    </div>
  );
};

export default ExcelDropZone;
