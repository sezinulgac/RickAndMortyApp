import React from "react";
import { ICharacter } from "../models/ICharacter";

interface Props {
  data: ICharacter[];
  onSelect: (char: ICharacter) => void;
  selectedId?: number;
}

const Character: React.FC<Props> = ({ data, onSelect, selectedId }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>İsim</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Tür</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Durum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((char) => (
          <tr
            key={char.id}
            onClick={() => onSelect(char)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedId === char.id ? "#f0f0f0" : "white",
            }}
          >
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{char.name}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{char.species}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{char.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Character;
