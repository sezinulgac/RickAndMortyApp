import React from "react";
import { ICharacter } from "../models/ICharacter";

const CharacterDetail: React.FC<{ character: ICharacter }> = ({ character }) => {
  return (
    <div style={{ border: "1px solid #ddd", marginTop: "20px", padding: "10px" }}>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} style={{ width: "150px", borderRadius: "8px" }} />
      <p><strong>Durum:</strong> {character.status}</p>
      <p><strong>Tür:</strong> {character.species}</p>
      <p><strong>Cinsiyet:</strong> {character.gender}</p>
      <p><strong>Lokasyon:</strong> {character.location.name}</p>
    </div>
  );
};

export default CharacterDetail;
