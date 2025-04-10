export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; // Lista de URLs de personajes que aparecen en este episodio
  created: string; // Fecha de creación
}

