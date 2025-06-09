// src/hooks/useCharacters.ts
import { useEffect, useState } from "react";
import { ICharacter } from "../models/ICharacter";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let results: ICharacter[] = [];
        for (let i = 1; i <= 5; i++) {
          const res = await fetch(`https://rickandmortyapi.com/api/character?page=${i}`);
          const data = await res.json();
          results = [...results, ...data.results];
        }
        setCharacters(results);
      } catch (e) {
        setError("Veriler alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return { characters, loading, error };
};
