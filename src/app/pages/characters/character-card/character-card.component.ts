import { Component, Input } from '@angular/core';
import { Character } from '../../../interface/character.interface';


@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character!: Character; // Recibimos los datos del personaje
  @Input() isAdmin!: boolean; // Recibimos el valor de isAdmin desde el componente padre
  @Input() getStatusColor!: (status: string) => string; // Recibimos el método para obtener el color del estado

}


