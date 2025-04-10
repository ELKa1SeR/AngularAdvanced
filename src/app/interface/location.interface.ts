export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Lista de URLs de personajes que viven en esta ubicación
  created: string;
}
