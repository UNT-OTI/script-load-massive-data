"use client"

import Head from "next/head";
import ExcelDropZone from "../components/ExcelDropZone";
import Header from "../components/Header";
import SelectListaEscuela from "@/components/SelectListaEscuela";
import { useState } from "react";

export default function Home() {
  const [selectedEscuela, setSelectedEscuela] = useState("");

  return (
    <div>
      <Head>
        <title>Excel Uploader</title>
        <meta name="description" content="Script para llenar escuelas" />
      </Head>
      <Header />
      <SelectListaEscuela setSelectedEscuela={setSelectedEscuela} />
      <ExcelDropZone selectedEscuela={selectedEscuela} />
    </div>
  );
}
