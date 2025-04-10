export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  created: string; // Fecha de creación (primera aparición)
  episode: string[]; // Episodios en los que aparece
}
