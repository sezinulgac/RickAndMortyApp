// src/App.tsx
import React, { useState } from "react";
import { useCharacters } from "./hooks/redux";
import Character from "./components/Character";
import CharacterDetail from "./components/CharacterDetails";
import { ICharacter } from "./models/ICharacter";

const App: React.FC = () => {
  const { characters, loading, error } = useCharacters();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<ICharacter | null>(null);

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <h1>Rick and Morty Karakterleri</h1>

      <input
        type="text"
        placeholder="İsme göre filtrele"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{ margin: "10px 0", padding: "8px", width: "100%" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <label>Sayfa boyutu: </label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={25}>25</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "gray" }}>Eşleşen sonuç bulunamadı.</p>
      ) : (
        <>
          <Character data={displayed} onSelect={setSelected} selectedId={selected?.id} />

          <div style={{ marginTop: "10px" }}>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
              Önceki
            </button>{" "}
            <span>
              Sayfa {currentPage} / {totalPages}
            </span>{" "}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Sonraki
            </button>
          </div>
        </>
      )}

      {selected && <CharacterDetail character={selected} />}
    </div>
  );
};

export default App;
